import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {HermesService} from '../../../shared-ng/services/services';
import {} from 'googlemaps';

@Component({
  selector: 'atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.css']
})
export class AtlasComponent implements OnInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  atlasEmployees: { role: string, username: string, photoURL: string, full_name: string }[] = [
    {role: 'Manager', username: 'Charmaine.Tan', photoURL: 'profiles/1920/2592-2049290.jpg', full_name: 'Charmaine Tan'},
    {role: 'Assistant Manger', username: 'Jonathan.Gillespie', photoURL: 'profiles/1920/1744-2054485.jpg', full_name: 'Jonathan Gillespie'},
    {role: 'Syrup Specialist', username: 'Braeley.Nelson', photoURL: 'profiles/1920/580-2071081.jpg', full_name: 'Braeley Nelson'},
    {role: 'Head Barista', username: 'Brooklyn.Anderson', photoURL: 'profiles/1819/00966-2044615.jpg', full_name: 'Brooklyn Anderson'},
    {role: 'Barista', username: 'Andrew.Nascimento', photoURL: 'profiles/1819/02776-2052796.jpg', full_name: 'Andrew Nascimento'},
    {role: 'Barista', username: 'Breanna.Scully', photoURL: 'profiles/1920/1129-2034359.jpg', full_name: 'Breanna Scully'},
    {role: 'Barista', username: 'Gregory.Birge', photoURL: '/profiles/1920/2262-2019445.jpg', full_name: 'Gregory Birge'},
    {role: 'Barista', username: 'Ryan.Rojas', photoURL: 'profiles/1718/00358-2036350.jpg', full_name: 'Ryan Rojas'},
    {role: 'Barista', username: 'Angie.Rodriguez', photoURL: 'images/default_mask/default.jpg', full_name: 'Angie Brizuela Rodriguez'},
    {role: 'Barista', username: 'Leili.VonBergen', photoURL: 'images/default_mask/default.jpg', full_name: 'Leili VonBergen'},
  ];
  employeeDisplayed = true;

  constructor(private hermesService: HermesService, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    // hides header and sub nav bar
    hermesService.sendShowHeader(false);
    hermesService.sendShowSubNav(false);
  }

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(46.049530, -118.388233),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          stylers: [
            {hue: '#ae8648'},
            {saturation: 70},
            {lightness: 0},
            {gamma: 1}
          ]
        },
      ]
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  displayEmployee() {
    this.employeeDisplayed = true;
  }

  displayInstagram() {
    this.employeeDisplayed = false;
  }

  baristaButtonStyle() {
    return {
      'background-color': this.employeeDisplayed ? '#fefaf5' : 'white',
      'border-style': this.employeeDisplayed ? 'none' : 'solid',
      'border-width': '0.1px',
      'box-shadow': this.employeeDisplayed ? 'none' : '-0.5px 1px 1px black'
    };
  }

  instagramButtonStyle() {
    return {
      'background-color': this.employeeDisplayed ? 'white' : '#fefaf5',
      'border-style': this.employeeDisplayed ? 'solid' : 'none',
      'border-width': '0.1px',
      'box-shadow': this.employeeDisplayed ? '-0.5px 1px 1px black' : 'none'
    };
  }
}
