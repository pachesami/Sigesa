import LeftPanel from '../components/LeftPanel';
import LoginForm from '../components/LoginForm';
import WaveDecoration from '../components/WaveDecoration';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex" style={{ minHeight: '520px' }}>
        <LeftPanel />

        <div
          className="relative flex items-center justify-center flex-1 overflow-hidden"
          style={{ backgroundColor: '#7B2D0E', minWidth: '340px' }}
        >
          <div className="px-10 py-10 z-10 w-full flex items-center justify-center">
            <LoginForm />
          </div>
          <WaveDecoration side="right" />
        </div>
      </div>
    </div>
  );
}

