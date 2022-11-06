import { Link } from 'react-router-dom';
import banner from '../Images/Advertisement.jpg';
export default function Advertisement() {
    const logoStyle = {padding:"10px",fontSize:"40px",letterSpacing:"1px",fontFamiy:'Kanit'};
    const divStyle = {backgroundImage:`url(${banner})`,backgroundSize:"cover"};
    const msgStyle = {paddingTop:"14rem",color:"white",paddingLeft:"30px",fontSize:"40px",width:"35%"};
    const btn1Style = {marginLeft:"2rem",marginTop:"1rem",fontSize:"1.2rem"}
    const btn2Style = {marginLeft:"1rem",marginTop:"1rem",fontSize:"1.2rem"}

    return (
    <div className="container-fluid">
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
        <div class="container-fluid">
          <h1 class="navbar-brand" style={logoStyle}>
            MailService
          </h1>
        </div>
      </nav>

      <div className="w-100 vh-100" style={divStyle}>
        <h2 style={msgStyle}>Simple, smart, and easy to use email</h2>
        <Link to="/signin"><button type="button" class="btn btn-light" style={btn1Style}>Create an account</button></Link>
        <Link to="/login"><button type="button" class="btn btn-outline-light" style={btn2Style}>Login</button></Link>
      </div>
    </div>
  );
}
