import '../style/SuccessPage.css';

import React from 'react';
import {ReactComponent as SuccessIllustration} from "../svg/Success.svg";

function SuccessPage() {
  return (
    <div className="success-card">

      <div className="card-body">
<SuccessIllustration/>
        <p>Your order has been processed successfully.</p>
        <button className="btn" onClick={() => window.location.href = '/'}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
