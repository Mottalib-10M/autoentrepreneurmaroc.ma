import { useState, useMemo } from 'react';
import ChampMontant from '../ui/ChampMontant';
import { simulerRevenuAnnuel, verifierSeuil, calculerChargesAE } from '../../lib/ae-engine';
import { formatMontant, formatPourcentage, parseMontant } from '../../lib/format';
import { AE_CONFIG } from '../../data/ae-config';
import type { TypeActivite } from '../../data/ae-config';

export default function CalculateurAE() {
  const [montantSaisi, setMontantSaisi] = useState('');
  const [typeActivite, setTypeActivite] = useState<TypeActivite>('services');
  const [periodeSaisie, setPeriodeSaisie] = useState<'mensuel' | 'trimestriel'>('mensuel');

  const montant = parseMontant(montantSaisi);

  const caMensuel = periodeSaisie === 'mensuel' ? montant : montant / 3;

  const simulation = useMemo(() => simulerRevenuAnnuel(caMensuel, typeActivite), [caMensuel, typeActivite]);
  const seuil = useMemo(() => verifierSeuil(simulation.caAnnuel, typeActivite), [simulation.caAnnuel, typeActivite]);
  const chargesTrim = useMemo(() => calculerChargesAE(simulation.caTrimestriel, typeActivite), [simulation.caTrimestriel, typeActivite]);

  const pourcentageSeuil = Math.min(seuil.pourcentageUtilise * 100, 150);
  const seuilLabel = AE_CONFIG.seuils[typeActivite].toLocaleString('fr-FR');

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="card">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Paramètres</h2>

        {/* Période Toggle */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-amber-900 mb-2">Période de saisie</label>
          <div className="flex rounded-lg overflow-hidden border-2 border-amber-200">
            <button
              type="button"
              onClick={() => setPeriodeSaisie('mensuel')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                periodeSaisie === 'mensuel'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setPeriodeSaisie('trimestriel')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                periodeSaisie === 'trimestriel'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              Trimestriel
            </button>
          </div>
        </div>

        {/* Type d'activité */}
        <div className="mb-4">
          <label htmlFor="type-activite" className="block text-sm font-semibold text-amber-900 mb-1">
            Type d'activité
          </label>
          <select
            id="type-activite"
            value={typeActivite}
            onChange={(e) => setTypeActivite(e.target.value as TypeActivite)}
            className="input-field"
          >
            <option value="services">Prestations de services (IR 2%)</option>
            <option value="commercial">Activités commerciales / industrielles / artisanales (IR 1%)</option>
          </select>
        </div>

        {/* Montant */}
        <ChampMontant
          label={periodeSaisie === 'mensuel' ? 'Chiffre d\'affaires mensuel' : 'Chiffre d\'affaires trimestriel'}
          value={montantSaisi}
          onChange={setMontantSaisi}
          placeholder="Ex: 15000"
          helpText={periodeSaisie === 'mensuel'
            ? 'Saisissez votre CA mensuel moyen'
            : 'Saisissez votre CA pour un trimestre'}
        />
      </div>

      {montant > 0 && (
        <>
          {/* Seuil Progress */}
          <div className={`card ${seuil.depassement ? 'border-red-400 bg-red-50' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-amber-900">Utilisation du seuil de CA</h3>
              <span className={`text-sm font-bold ${seuil.depassement ? 'text-red-600' : 'text-amber-700'}`}>
                {(seuil.pourcentageUtilise * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  seuil.depassement
                    ? 'bg-red-500'
                    : seuil.pourcentageUtilise > 0.8
                      ? 'bg-orange-500'
                      : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(pourcentageSeuil, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 DH</span>
              <span>Seuil : {seuilLabel} DH/an</span>
            </div>
            {seuil.depassement && (
              <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-sm text-red-800 font-medium">
                  Attention : Votre CA annuel projeté ({simulation.caAnnuel.toLocaleString('fr-FR')} DH) dépasse le seuil de {seuilLabel} DH.
                  Si ce dépassement persiste 2 années consécutives, vous devrez passer au régime réel (SARL ou autre).
                </p>
              </div>
            )}
            {!seuil.depassement && seuil.pourcentageUtilise > 0.8 && (
              <div className="mt-3 p-3 bg-orange-100 border border-orange-300 rounded-lg">
                <p className="text-sm text-orange-800 font-medium">
                  Vous approchez du seuil ! Il vous reste {seuil.margeRestante.toLocaleString('fr-FR')} DH de marge.
                  Pensez à anticiper un changement de statut.
                </p>
              </div>
            )}
          </div>

          {/* Résultats Trimestriels */}
          <div className="result-card">
            <h2 className="text-xl font-bold text-amber-900 mb-4">Détail trimestriel</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <ResultItem label="CA trimestriel" value={formatMontant(simulation.caTrimestriel)} />
              <ResultItem
                label={`IR forfaitaire (${formatPourcentage(chargesTrim.tauxIR, 0)})`}
                value={formatMontant(chargesTrim.ir)}
                negative
              />
              <ResultItem label="AMO (CNSS)" value={formatMontant(chargesTrim.amo)} negative />
              <ResultItem label="Total charges" value={formatMontant(chargesTrim.totalCharges)} negative highlight />
              <ResultItem label="Net trimestriel" value={formatMontant(chargesTrim.net)} positive highlight />
              <ResultItem label="Taux effectif" value={formatPourcentage(chargesTrim.tauxEffectif)} />
            </div>
          </div>

          {/* Résultats Annuels */}
          <div className="result-card">
            <h2 className="text-xl font-bold text-amber-900 mb-4">Projection annuelle</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <ResultItem label="CA annuel" value={formatMontant(simulation.caAnnuel)} />
              <ResultItem label="IR annuel" value={formatMontant(simulation.irAnnuel)} negative />
              <ResultItem label="AMO annuel" value={formatMontant(simulation.amoAnnuel)} negative />
              <ResultItem label="Total charges" value={formatMontant(simulation.totalChargesAnnuel)} negative />
              <ResultItem label="Revenu net annuel" value={formatMontant(simulation.netAnnuel)} positive highlight />
              <ResultItem label="Revenu net mensuel" value={formatMontant(simulation.netMensuelMoyen)} positive highlight />
            </div>
          </div>

          {/* Résumé */}
          <div className="card bg-amber-50">
            <h3 className="text-lg font-bold text-amber-900 mb-3">Résumé</h3>
            <p className="text-gray-700 leading-relaxed">
              Pour un chiffre d'affaires {periodeSaisie} de <strong>{montant.toLocaleString('fr-FR')} DH</strong> en{' '}
              <strong>{typeActivite === 'services' ? 'prestations de services' : 'activités commerciales'}</strong>, vous
              payerez <strong>{formatMontant(simulation.totalChargesAnnuel)}</strong> de charges annuelles
              (IR + AMO), soit un taux effectif de <strong>{formatPourcentage(simulation.tauxEffectifAnnuel)}</strong>.
              Votre revenu net mensuel moyen sera de <strong>{formatMontant(simulation.netMensuelMoyen)}</strong>.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function ResultItem({
  label,
  value,
  negative = false,
  positive = false,
  highlight = false,
}: {
  label: string;
  value: string;
  negative?: boolean;
  positive?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`p-3 rounded-lg ${highlight ? 'bg-white shadow-sm border border-amber-200' : ''}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${
        negative ? 'text-red-600' : positive ? 'text-green-700' : 'text-amber-900'
      }`}>
        {negative && '- '}{value}
      </p>
    </div>
  );
}
