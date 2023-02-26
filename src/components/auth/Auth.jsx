import { useNavigate } from 'react-router-dom';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

/**
 *
 * @param {{
 *    type: 'signin' | 'signup'
 * }} param0
 * @returns
 */
export function Auth({ type }) {
  const navigation = useNavigate();

  return (
    <>
      <div className="h-[500px] flex justify-center pt-[50px]">
        <div className="w-[450px] h-min shadow-[0px_0px_10px_rgba(0,_0,_0,_0.2)]">
          <div className="h-[60px] flex overflow-hidden">
            <NavigationButton
              onClick={() => navigation('/register')}
              active={type == 'signup'}
            >
              Đăng ký
            </NavigationButton>
            <NavigationButton
              onClick={() => navigation('/login')}
              active={type == 'signin'}
            >
              Đăng nhập
            </NavigationButton>
          </div>
          {type !== 'signup' ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </>
  );
}

function NavigationButton({ children, active, onClick }) {
  return (
    <button
      className={`w-[50%] h-full font-bold text-[18px] ${
        active
          ? 'shadow-[0px_0px_10px_rgba(0,_0,_0,_0.2)] relative'
          : 'bg-gray-50'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
