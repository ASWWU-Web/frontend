import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto" rel="stylesheet">

  </head>
  <body>
    <!-- Borders  -->
    <div id="border1" class="side"></div>
    <div id="border2" class="side"></div>


    <div id="jumbotron" class="container">
       <div class="row">
         <div class="col col-sm-12 col-md-8 offset-md-2">
           <h1 id="title">
             What is ASWWU?
           </h1>
         </div>
       </div>
       <div class="row">
         <div class="col col-sm-12 col-md-8 offset-md-2">
           <h3> a film studio</h3>
         </div>
       </div>
       <div class="row">
         <div class="col col-sm-12 col-md-8 offset-md-2">
           <h2> your next job opportunity</h2>
         </div>
       </div>
    </div>

    <!-- Search Bar -->
    <div id="searchBar" class="container">
      <div class="row justify-content-center">
        <div class="col col-sm-12 col-md-8">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search Opportunities..">
          </div>
        </div>
      </div>
    </div>

    <!-- Job Opportunities  -->
    <div id="jobOpps" class="container">
      <div id="cards" class="row justify-content-center">

        <!-- Cards -->

        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div><div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div><div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div><div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div><div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <img class="card-img-top" src="http://lorempixel.com/300/200/abstract/" alt="Card image cap">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-block">
              <h3 class="card-title">Outdoors Department Head</h3>
              <p class="card-text">In charge of the Mountain Rents and Trip leader teams
                • Thorough knowledge of wide variety of outdoor activities • Has relevant professional certi cations and experience
                • Able to teach in an outdoor environment
                • Passionate about sharing the outdoors with others
                </p>
              <a href="#" class="btn">View Opportunity</a>
            </div>
          </div>
        </div>



      </div>
    </div>

    <!-- jQuery first, then Tether, then Bootstrap JS. -->
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
  </body>
</html>
`
})

export class AppComponent {

}
