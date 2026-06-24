import { useState, useEffect, useRef } from 'react';
import ShareButtons from '../ui/ShareButtons';
import { calculerFacture } from '../../lib/ae-engine';
import { formatMontant, formatDateCourte } from '../../lib/format';
import type { LigneFacture } from '../../lib/ae-engine';
import { useUrlParam, stringParam } from '../../hooks/useUrlState';

interface InfoAE {
  nom: string;
  ice: string;
  adresse: string;
  ville: string;
  telephone: string;
}

interface InfoClient {
  nom: string;
  ice: string;
  adresse: string;
  ville: string;
}

const STORAGE_KEY = 'ae-facture-info';
const COUNTER_KEY = 'ae-facture-counter';

function getStoredAEInfo(): InfoAE {
  if (typeof window === 'undefined') return { nom: '', ice: '', adresse: '', ville: '', telephone: '' };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { nom: '', ice: '', adresse: '', ville: '', telephone: '' };
}

function getNextNumber(): string {
  if (typeof window === 'undefined') return 'F-001';
  try {
    const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
    const next = counter + 1;
    localStorage.setItem(COUNTER_KEY, String(next));
    return `F-${String(next).padStart(3, '0')}`;
  } catch {
    return 'F-001';
  }
}

const emptyLigne: LigneFacture = { designation: '', quantite: 1, prixUnitaire: 0 };

export default function GenerateurFacture() {
  const [infoAE, setInfoAE] = useState<InfoAE>(getStoredAEInfo);
  const [client, setClient] = useState<InfoClient>({ nom: '', ice: '', adresse: '', ville: '' });
  const [lignes, setLignes] = useState<LigneFacture[]>([{ ...emptyLigne }]);
  const [dateFacture, setDateFacture] = useState(new Date().toISOString().split('T')[0]);
  const [numeroFacture, setNumeroFacture] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  // URL params for pre-filling client name and first line designation
  const [urlClientName] = useUrlParam(stringParam('client', ''));
  const [urlDesignation] = useUrlParam(stringParam('designation', ''));

  useEffect(() => {
    setNumeroFacture(getNextNumber());
    // Pre-fill from URL params on mount
    if (urlClientName) {
      setClient((prev) => ({ ...prev, nom: urlClientName }));
    }
    if (urlDesignation) {
      setLignes([{ designation: urlDesignation, quantite: 1, prixUnitaire: 0 }]);
    }
  }, []);

  // Save AE info to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(infoAE));
    }
  }, [infoAE]);

  const factureResult = calculerFacture(lignes.filter(l => l.designation && l.prixUnitaire > 0));

  function ajouterLigne() {
    setLignes([...lignes, { ...emptyLigne }]);
  }

  function supprimerLigne(index: number) {
    if (lignes.length <= 1) return;
    setLignes(lignes.filter((_, i) => i !== index));
  }

  function updateLigne(index: number, field: keyof LigneFacture, value: string) {
    const updated = [...lignes];
    if (field === 'designation') {
      updated[index] = { ...updated[index], designation: value };
    } else {
      const num = parseFloat(value.replace(',', '.')) || 0;
      updated[index] = { ...updated[index], [field]: Math.max(0, num) };
    }
    setLignes(updated);
  }

  function handlePrint() {
    window.print();
  }

  const dateParsed = new Date(dateFacture + 'T00:00:00');

  // Share text
  const shareText = 'Générez vos factures auto-entrepreneur conformes gratuitement (ICE, exonération TVA) :';

  return (
    <div className="space-y-8">
      {/* AE Info Form */}
      <div className="card no-print">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Vos informations (Auto-Entrepreneur)</h2>
        <p className="text-sm text-gray-500 mb-4">Ces informations sont sauvegardées automatiquement pour vos prochaines factures.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Nom et prénom</label>
            <input
              type="text"
              value={infoAE.nom}
              onChange={e => setInfoAE({ ...infoAE, nom: e.target.value })}
              className="input-field"
              placeholder="Mohamed Alami"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Numéro ICE</label>
            <input
              type="text"
              value={infoAE.ice}
              onChange={e => setInfoAE({ ...infoAE, ice: e.target.value })}
              className="input-field"
              placeholder="001234567000078"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Adresse</label>
            <input
              type="text"
              value={infoAE.adresse}
              onChange={e => setInfoAE({ ...infoAE, adresse: e.target.value })}
              className="input-field"
              placeholder="123 Rue Mohammed V"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Ville</label>
            <input
              type="text"
              value={infoAE.ville}
              onChange={e => setInfoAE({ ...infoAE, ville: e.target.value })}
              className="input-field"
              placeholder="Casablanca"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Téléphone</label>
            <input
              type="text"
              value={infoAE.telephone}
              onChange={e => setInfoAE({ ...infoAE, telephone: e.target.value })}
              className="input-field"
              placeholder="+212 6 00 00 00 00"
            />
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="card no-print">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Informations du client</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Nom / Raison sociale</label>
            <input
              type="text"
              value={client.nom}
              onChange={e => setClient({ ...client, nom: e.target.value })}
              className="input-field"
              placeholder="Société ABC"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">ICE du client</label>
            <input
              type="text"
              value={client.ice}
              onChange={e => setClient({ ...client, ice: e.target.value })}
              className="input-field"
              placeholder="001234567000078"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Adresse</label>
            <input
              type="text"
              value={client.adresse}
              onChange={e => setClient({ ...client, adresse: e.target.value })}
              className="input-field"
              placeholder="456 Boulevard Hassan II"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Ville</label>
            <input
              type="text"
              value={client.ville}
              onChange={e => setClient({ ...client, ville: e.target.value })}
              className="input-field"
              placeholder="Rabat"
            />
          </div>
        </div>
      </div>

      {/* Facture Details */}
      <div className="card no-print">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-amber-900">Lignes de facturation</h2>
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-xs text-gray-500">N° Facture</label>
              <input
                type="text"
                value={numeroFacture}
                onChange={e => setNumeroFacture(e.target.value)}
                className="input-field text-sm py-1 w-28"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Date</label>
              <input
                type="date"
                value={dateFacture}
                onChange={e => setDateFacture(e.target.value)}
                className="input-field text-sm py-1"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-amber-200">
                <th className="text-left py-2 text-amber-900">Désignation</th>
                <th className="text-center py-2 w-24 text-amber-900">Quantité</th>
                <th className="text-right py-2 w-32 text-amber-900">Prix unitaire</th>
                <th className="text-right py-2 w-32 text-amber-900">Montant</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((ligne, index) => {
                const montant = ligne.quantite * ligne.prixUnitaire;
                return (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 pr-2">
                      <input
                        type="text"
                        value={ligne.designation}
                        onChange={e => updateLigne(index, 'designation', e.target.value)}
                        className="input-field text-sm py-1"
                        placeholder="Description du service / produit"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={ligne.quantite || ''}
                        onChange={e => updateLigne(index, 'quantite', e.target.value)}
                        className="input-field text-sm py-1 text-center"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={ligne.prixUnitaire || ''}
                        onChange={e => updateLigne(index, 'prixUnitaire', e.target.value)}
                        className="input-field text-sm py-1 text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-2 px-2 text-right font-medium">
                      {formatMontant(montant)}
                    </td>
                    <td className="py-2">
                      {lignes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => supprimerLigne(index)}
                          className="text-red-400 hover:text-red-600 p-1"
                          aria-label="Supprimer la ligne"
                        >
                          X
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button type="button" onClick={ajouterLigne} className="btn-secondary text-sm py-2 px-4">
            + Ajouter une ligne
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total HT</p>
            <p className="text-2xl font-bold text-amber-900">{formatMontant(factureResult.totalHT)}</p>
          </div>
        </div>
      </div>

      {/* Print Button + Share */}
      <div className="no-print">
        <div className="flex flex-wrap gap-4 items-center">
          <button type="button" onClick={handlePrint} className="btn-primary">
            Imprimer / Télécharger PDF
          </button>
        </div>
        <ShareButtons text={shareText} />
      </div>

      {/* Invoice Preview */}
      <div ref={printRef} className="invoice-preview card bg-white border-2 border-gray-200 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-4 border-b-2 border-amber-400">
          <div>
            <h2 className="text-2xl font-bold text-amber-800">FACTURE</h2>
            <p className="text-gray-600 mt-1">N° {numeroFacture}</p>
            <p className="text-gray-600">Date : {formatDateCourte(dateParsed)}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-amber-900">{infoAE.nom || 'Votre nom'}</p>
            <p className="text-sm text-gray-600">ICE : {infoAE.ice || '...'}</p>
            <p className="text-sm text-gray-600">{infoAE.adresse || '...'}</p>
            <p className="text-sm text-gray-600">{infoAE.ville || '...'}</p>
            {infoAE.telephone && <p className="text-sm text-gray-600">Tél : {infoAE.telephone}</p>}
          </div>
        </div>

        {/* Client */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Facturé à :</p>
          <p className="font-bold">{client.nom || 'Nom du client'}</p>
          {client.ice && <p className="text-sm text-gray-600">ICE : {client.ice}</p>}
          <p className="text-sm text-gray-600">{client.adresse || '...'}</p>
          <p className="text-sm text-gray-600">{client.ville || '...'}</p>
        </div>

        {/* Lines */}
        <table className="w-full text-sm mb-8">
          <thead>
            <tr className="border-b-2 border-amber-400">
              <th className="text-left py-2 text-amber-900">Désignation</th>
              <th className="text-center py-2 text-amber-900">Qté</th>
              <th className="text-right py-2 text-amber-900">Prix unit. HT</th>
              <th className="text-right py-2 text-amber-900">Montant HT</th>
            </tr>
          </thead>
          <tbody>
            {factureResult.lignes.map((ligne, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2">{ligne.designation}</td>
                <td className="py-2 text-center">{ligne.quantite}</td>
                <td className="py-2 text-right">{formatMontant(ligne.prixUnitaire)}</td>
                <td className="py-2 text-right font-medium">{formatMontant(ligne.montant)}</td>
              </tr>
            ))}
            {factureResult.lignes.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-400">
                  Ajoutez des lignes de facturation ci-dessus
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total HT</span>
              <span className="font-semibold">{formatMontant(factureResult.totalHT)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">TVA</span>
              <span className="text-gray-500">Exonéré</span>
            </div>
            <div className="flex justify-between border-t-2 border-amber-400 pt-2">
              <span className="font-bold text-amber-900">Total TTC</span>
              <span className="text-xl font-bold text-amber-900">{formatMontant(factureResult.totalTTC)}</span>
            </div>
          </div>
        </div>

        {/* TVA Mention */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 italic">
            {factureResult.mentionTVA}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Facture générée sur autoentrepreneurmaroc.ma
          </p>
        </div>
      </div>
    </div>
  );
}
