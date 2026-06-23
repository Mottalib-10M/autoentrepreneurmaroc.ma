import { useState, useEffect, useMemo } from 'react';
import { verifierSeuil } from '../../lib/ae-engine';
import { formatMontant, parseMontant } from '../../lib/format';
import { AE_CONFIG } from '../../data/ae-config';
import type { TypeActivite } from '../../data/ae-config';

const STORAGE_KEY = 'ae-suivi-ca';

const MOIS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

interface SuiviData {
  annee: number;
  typeActivite: TypeActivite;
  mois: string[]; // 12 strings for each month
}

function getStoredData(): SuiviData {
  if (typeof window === 'undefined') {
    return { annee: new Date().getFullYear(), typeActivite: 'services', mois: Array(12).fill('') };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.mois && data.mois.length === 12) return data;
    }
  } catch {}
  return { annee: new Date().getFullYear(), typeActivite: 'services', mois: Array(12).fill('') };
}

export default function SuiviCA() {
  const [data, setData] = useState<SuiviData>(getStoredData);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const montantsMois = data.mois.map(v => parseMontant(v));
  const totalCA = montantsMois.reduce((sum, m) => sum + m, 0);
  const moisRemplis = montantsMois.filter(m => m > 0).length;

  const seuil = useMemo(
    () => verifierSeuil(totalCA, data.typeActivite),
    [totalCA, data.typeActivite]
  );

  // Projection: if trend continues
  const caMoyenParMois = moisRemplis > 0 ? totalCA / moisRemplis : 0;
  const caProjeteFin = moisRemplis > 0 ? caMoyenParMois * 12 : 0;
  const seuilValue = AE_CONFIG.seuils[data.typeActivite];

  // Running totals for chart
  const runningTotals = montantsMois.reduce<number[]>((acc, val) => {
    const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push(prev + val);
    return acc;
  }, []);

  const maxChart = Math.max(seuilValue, caProjeteFin, totalCA) * 1.1;

  function updateMois(index: number, value: string) {
    const cleaned = value.replace(/[^0-9\s.,]/g, '');
    const newMois = [...data.mois];
    newMois[index] = cleaned;
    setData({ ...data, mois: newMois });
  }

  function resetData() {
    if (confirm('Voulez-vous vraiment réinitialiser le suivi ?')) {
      setData({
        annee: new Date().getFullYear(),
        typeActivite: data.typeActivite,
        mois: Array(12).fill(''),
      });
    }
  }

  const pourcentageSeuil = Math.min((totalCA / seuilValue) * 100, 150);

  // Trimestres
  const trimestres = [
    { label: 'T1 (Jan-Mar)', total: montantsMois.slice(0, 3).reduce((a, b) => a + b, 0) },
    { label: 'T2 (Avr-Jun)', total: montantsMois.slice(3, 6).reduce((a, b) => a + b, 0) },
    { label: 'T3 (Jul-Sep)', total: montantsMois.slice(6, 9).reduce((a, b) => a + b, 0) },
    { label: 'T4 (Oct-Déc)', total: montantsMois.slice(9, 12).reduce((a, b) => a + b, 0) },
  ];

  return (
    <div className="space-y-8">
      {/* Config */}
      <div className="card">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-amber-900">Suivi du CA - {data.annee}</h2>
          <div className="flex gap-4 items-center">
            <select
              value={data.typeActivite}
              onChange={e => setData({ ...data, typeActivite: e.target.value as TypeActivite })}
              className="input-field text-sm py-2 w-auto"
            >
              <option value="services">Services (seuil 200 000 DH)</option>
              <option value="commercial">Commercial (seuil 500 000 DH)</option>
            </select>
            <button type="button" onClick={resetData} className="text-sm text-red-500 hover:text-red-700">
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Monthly Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {MOIS.map((mois, i) => (
            <div key={mois}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{mois}</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={data.mois[i]}
                  onChange={e => updateMois(i, e.target.value)}
                  placeholder="0"
                  className="input-field text-sm py-2 pr-10"
                  autoComplete="off"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">DH</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`card ${seuil.depassement ? 'border-red-400 bg-red-50' : ''}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-amber-900">Total CA {data.annee}</h3>
          <span className="text-2xl font-bold text-amber-900">{formatMontant(totalCA)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              seuil.depassement ? 'bg-red-500' : seuil.pourcentageUtilise > 0.8 ? 'bg-orange-500' : 'bg-amber-500'
            }`}
            style={{ width: `${Math.min(pourcentageSeuil, 100)}%` }}
          />
          {/* Seuil marker */}
          <div
            className="absolute top-0 h-full w-0.5 bg-red-600"
            style={{ left: `${Math.min((seuilValue / maxChart) * 100, 100)}%` }}
            title={`Seuil: ${seuilValue.toLocaleString('fr-FR')} DH`}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 DH</span>
          <span>{(seuil.pourcentageUtilise * 100).toFixed(1)}% du seuil</span>
          <span>Seuil : {seuilValue.toLocaleString('fr-FR')} DH</span>
        </div>

        {seuil.depassement && (
          <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-sm text-red-800 font-medium">
              Attention : Votre CA ({totalCA.toLocaleString('fr-FR')} DH) dépasse le seuil de {seuilValue.toLocaleString('fr-FR')} DH !
              Si le dépassement persiste 2 années consécutives, vous devrez changer de statut.
            </p>
          </div>
        )}
        {!seuil.depassement && seuil.pourcentageUtilise > 0.8 && (
          <div className="mt-3 p-3 bg-orange-100 border border-orange-300 rounded-lg">
            <p className="text-sm text-orange-800 font-medium">
              Attention : Il vous reste {formatMontant(seuil.margeRestante)} avant d'atteindre le seuil.
            </p>
          </div>
        )}
      </div>

      {/* Visual Chart */}
      <div className="card">
        <h3 className="font-bold text-amber-900 mb-4">Évolution du CA cumulé</h3>
        <div className="relative h-64 flex items-end gap-1">
          {/* Seuil line */}
          <div
            className="absolute w-full border-t-2 border-dashed border-red-400 z-10"
            style={{ bottom: `${(seuilValue / maxChart) * 100}%` }}
          >
            <span className="absolute right-0 -top-5 text-xs text-red-500 font-medium">
              Seuil {seuilValue.toLocaleString('fr-FR')} DH
            </span>
          </div>

          {/* Projection line */}
          {caProjeteFin > 0 && (
            <div
              className="absolute w-full border-t border-dashed border-blue-400 z-10"
              style={{ bottom: `${Math.min((caProjeteFin / maxChart) * 100, 100)}%` }}
            >
              <span className="absolute left-0 -top-5 text-xs text-blue-500 font-medium">
                Projection : {Math.round(caProjeteFin).toLocaleString('fr-FR')} DH
              </span>
            </div>
          )}

          {/* Bars */}
          {MOIS.map((mois, i) => {
            const height = maxChart > 0 ? (runningTotals[i] / maxChart) * 100 : 0;
            const isActive = montantsMois[i] > 0;
            return (
              <div key={mois} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    runningTotals[i] > seuilValue
                      ? 'bg-red-400'
                      : isActive
                        ? 'bg-amber-500'
                        : 'bg-gray-200'
                  }`}
                  style={{ height: `${Math.max(height, 1)}%` }}
                  title={`${mois}: ${formatMontant(runningTotals[i])} (cumul)`}
                />
                <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                  {mois.slice(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trimestres */}
      <div className="card">
        <h3 className="font-bold text-amber-900 mb-4">Résumé par trimestre</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trimestres.map((t) => (
            <div key={t.label} className="bg-amber-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500 mb-1">{t.label}</p>
              <p className="text-lg font-bold text-amber-900">{formatMontant(t.total)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projection */}
      {moisRemplis > 0 && (
        <div className="card bg-amber-50">
          <h3 className="font-bold text-amber-900 mb-3">Projection annuelle</h3>
          <p className="text-gray-700">
            Avec un CA moyen de <strong>{formatMontant(caMoyenParMois)}</strong> par mois
            (sur {moisRemplis} mois renseignés), votre CA annuel projeté est de{' '}
            <strong>{formatMontant(caProjeteFin)}</strong>.
          </p>
          {caProjeteFin > seuilValue ? (
            <p className="text-red-700 font-medium mt-2">
              À ce rythme, vous dépasserez le seuil de {seuilValue.toLocaleString('fr-FR')} DH.
              Envisagez de passer à la SARL.
            </p>
          ) : (
            <p className="text-green-700 font-medium mt-2">
              Vous restez dans les limites du statut auto-entrepreneur. Marge restante estimée :{' '}
              {formatMontant(seuilValue - caProjeteFin)}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
