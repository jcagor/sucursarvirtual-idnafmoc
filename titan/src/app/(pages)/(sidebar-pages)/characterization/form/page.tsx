import { CharacterizationFormTemplate } from 'presentation';
import { characterizationFormJson } from 'presentation/components/templates/characterization/form-json';

export default function CharacterizationFormPage() {
  return <CharacterizationFormTemplate json={characterizationFormJson}   />;
}
