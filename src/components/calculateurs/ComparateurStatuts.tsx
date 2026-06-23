import { useState, useMemo } from 'react';
import ChampMontant from '../ui/ChampMontant';
import { comparerStatuts } from '../../lib/ae-engine';
import { formatMontant, formatPourcentage, parseMontant } from '../../lib/format';

export default function ComparateurStatuts() {
  const [caSaisi, setCaSaisi] = useState('');
  const [chargesSaisies, setChargesSaisies] = useState('');
  const [modeCharges, setModeCharges] = useState<'pourcentage' | 'montant'>('pourcentage');
  const [pourcentageCharges, setPourcentageCharges] = useState('30');

  const caAnnuel = parseMontant(caSaisi);
  const chargesEstimees = modeCharges === 'pourcentage'
    ? caAnnuel * (parseMontant(pourcentageCharges) / 100)
    : parseMontant(chargesSaisies);

  const comparaison = useMemo(
    () => caAnnuel > 0 ? comparerStatuts(caAnnuel, chargesEstimees) : null,
    [caAnnuel, chargesEstimees]
  );

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="card">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Parametres de comparaison</h2>

        <ChampMontant
          label="Chiffre d'affaires annuel estime"
          value={caSaisi}
          onChange={setCaSaisi}
          placeholder="Ex: 150000"
          helpText="Votre CA annuel prevu ou actuel"
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-amber-900 mb-2">Mode de calcul des charges</label>
          <div className="flex rounded-lg overflow-hidden border-2 border-amber-200">
            <button
              type="button"
              onClick={() => setModeCharges('pourcentage')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                modeCharges === 'pourcentage'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              % du CA
            </button>
            <button
              type="button"
              onClick={() => setModeCharges('montant')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                modeCharges === 'montant'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              Montant fixe
            </button>
          </div>
        </div>

        {modeCharges === 'pourcentage' ? (
          <ChampMontant
            label="Charges professionnelles estimees"
            value={pourcentageCharges}
            onChange={setPourcentageCharges}
            suffix="%"
            placeholder="30"
            helpText="Pourcentage de votre CA consacre aux charges (loyer, materiel, etc.) - utile pour SARL/SAS"
          />
        ) : (
          <ChampMontant
            label="Charges professionnelles annuelles"
            value={chargesSaisies}
            onChange={setChargesSaisies}
            placeholder="Ex: 50000"
            helpText="Montant total annuel de vos charges (loyer, materiel, etc.)"
          />
        )}

        {caAnnuel > 0 && (
          <p className="text-sm text-gray-600">
            Charges estimees : <strong>{formatMontant(chargesEstimees)}</strong> / an
            {modeCharges === 'pourcentage' && ` (${pourcentageCharges}% de ${formatMontant(caAnnuel)})`}
          </p>
        )}
      </div>

      {comparaison && (
        <>
          {/* Recommandation */}
          <div className="card bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-400">
            <div className="flex items-start gap-3">
              <span className="text-3xl">&#9733;</span>
              <div>
                <h3 className="text-lg font-bold text-amber-900">
                  Recommandation : {comparaison.recommandation}
                </h3>
                <p className="text-gray-700 mt-1">{comparaison.raisonRecommandation}</p>
              </div>
            </div>
          </div>

          {/* Comparaison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {comparaison.statuts.map((statut) => {
              const isRecommande = statut.statut === comparaison.recommandation;
              return (
                <div
                  key={statut.statut}
                  className={`card relative ${
                    isRecommande
                      ? 'border-2 border-amber-500 ring-2 ring-amber-200'
                      : ''
                  }`}
                >
                  {isRecommande && (
                    <span className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Recommande
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-amber-900 mb-4 mt-1">
                    {statut.statut}
                  </h3>

                  {/* Chiffres cles */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CA annuel</span>
                      <span className="font-semibold">{formatMontant(statut.caAnnuel)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Impots</span>
                      <span className="font-semibold text-red-600">- {formatMontant(statut.impots)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Charges sociales</span>
                      <span className="font-semibold text-red-600">- {formatMontant(statut.charges)}</span>
                    </div>
                    <div className="border-t border-amber-200 pt-2 flex justify-between">
                      <span className="text-sm font-bold text-amber-900">Total prelevements</span>
                      <span className="font-bold text-red-600">- {formatMontant(statut.totalPrelevements)}</span>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg flex justify-between">
                      <span className="text-sm font-bold text-amber-900">Net final</span>
                      <span className="text-lg font-bold text-green-700">{formatMontant(statut.netApresCharges)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Taux effectif</span>
                      <span className="font-semibold">{formatPourcentage(statut.tauxEffectif)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Complexite</span>
                      <span className={`font-semibold ${
                        statut.complexite === 'Faible' ? 'text-green-600' :
                        statut.complexite === 'Moyenne' ? 'text-orange-600' : 'text-red-600'
                      }`}>{statut.complexite}</span>
                    </div>
                  </div>

                  {/* Avantages */}
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-green-700 mb-2">Avantages</h4>
                    <ul className="space-y-1">
                      {statut.avantages.map((a, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">+</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Inconvenients */}
                  <div>
                    <h4 className="text-sm font-bold text-red-700 mb-2">Inconvenients</h4>
                    <ul className="space-y-1">
                      {statut.inconvenients.map((inc, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                          <span className="text-red-500 mt-0.5 flex-shrink-0">-</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bar Chart Visual */}
          <div className="card">
            <h3 className="text-lg font-bold text-amber-900 mb-4">Comparaison visuelle - Net apres charges</h3>
            <div className="space-y-4">
              {comparaison.statuts.map((statut) => {
                const maxNet = Math.max(...comparaison.statuts.map(s => Math.max(s.netApresCharges, 0)));
                const width = maxNet > 0 ? Math.max((statut.netApresCharges / maxNet) * 100, 0) : 0;
                return (
                  <div key={statut.statut}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{statut.statut}</span>
                      <span className="font-bold">{formatMontant(statut.netApresCharges)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div
                        className={`h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 ${
                          statut.statut === comparaison.recommandation
                            ? 'bg-amber-500'
                            : 'bg-amber-300'
                        }`}
                        style={{ width: `${width}%`, minWidth: width > 0 ? '40px' : '0' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
