import { useState } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import MyProfileSection from '../components/MyProfileSection';
import SubjectsSection from '../components/SubjectsSection';
import PeriodsSection from '../components/PeriodsSection';
import TeachersSection from '../components/TeachersSection';
import GradesSection from '../components/GradesSection';
import GuardiansSection from '../components/GuardiansSection';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <MyProfileSection />;
      case 'subjects':
        return <SubjectsSection />;
      case 'periods':
        return <PeriodsSection />;
      case 'grades':
        return <GradesSection />;
      case 'teachers':
        return <TeachersSection />;
      case 'guardians':
        return <GuardiansSection />;
      default:
        return <MyProfileSection />;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1">
        <SettingsSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
      </div>
      <div className="col-span-3 space-y-6">
        {renderContent()}
      </div>
    </div>
  );
}
