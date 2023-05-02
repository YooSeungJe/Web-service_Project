import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerJson from './swagger.json';

function MySwaggerUI() {
  return (
    <div className='App'>
      <SwaggerUI spec={swaggerJson} />
    </div>
  );
}

export default MySwaggerUI;
