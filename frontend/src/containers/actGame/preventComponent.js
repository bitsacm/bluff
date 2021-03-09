import React, {Component} from 'react';
import Layout from '../home/homeLayoutComponent';
import './prevent.css';

class Prevent extends Component {
  render() {
    return(
      <Layout>
        <div className = "container">
          <div className = "row justify-content-center prevent-row align-items-center">
            <div className = "col-11 col-md-6 col-lg-5">
              <p className = "join-imp-info">Return to appropriate window dimensions to continue playing the game. It ain't fun without the meet.<br/>
                <span className = "join-imp-highlight">Current width :</span>  {this.props.width}px<br/>
                <span className = "join-imp-highlight">Width range allowed :</span> 650-900px</p>
            </div>        
          </div>
        </div>
      </Layout>
    );
  }
}

export default Prevent;