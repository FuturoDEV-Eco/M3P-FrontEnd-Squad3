import styled from './login.module.css';
import FormLoginTabs from '../../components/organism/tabLoginCadastro/index';

function LoginSignup() {
  return (
    <div className={styled.container}>
      <div className={styled.boxcenter}>
        <div className={styled.boxright}>
          <FormLoginTabs />
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
