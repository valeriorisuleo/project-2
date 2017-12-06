'use strict';

/* global google:true */

$(function () {
  var $map = $('#map');
  var map = null;
  if ($map.length) initMap();
  var infoWindow = new google.maps.InfoWindow();

  function initMap() {
    var latLng = { lat: 51.515113, lng: -0.072051 };
    map = new google.maps.Map($map.get(0), {
      zoom: 12,
      center: latLng,
      scrollwheel: false
    });
    //we prevent the error. It try to run the loop but in this map (user/edit) there is not marker.data
    var markerData = $map.data('markers');
    if (markerData) createMarkers(markerData);
  }

  function createMarkers(markerData) {
    markerData.forEach(function (data) {
      var marker = new google.maps.Marker({
        map: map,
        position: { lat: data.lat, lng: data.lng },
        animation: google.maps.Animation.DROP
      });
      // add an infoWindow
      marker.addListener('click', function () {
        infoWindow.close();

        var content = data.dogs.reduce(function (string, dog) {
          return string + '<p>Name:' + dog.name + ' Breed:' + dog.breed + ' Age:' + dog.age + '</p>';
        }, '');

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });
    });
  }

  var $input = $('.autocomplete');

  if ($input.length > 0) {
    var options = {
      componentRestrictions: { country: 'uk' },
      type: 'park'
    };

    var autocomplete = new google.maps.places.Autocomplete($input[0], options);

    autocomplete.addListener('place_changed', function () {

      var place = autocomplete.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        animation: google.maps.Animation.DROP
      });

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      $('[name="park[lat]"]').val(lat);
      $('[name="park[lng]"]').val(lng);
      $('[name="park[placeId]"]').val(place.id);
      $('[name="park[name]"]').val(place.name);
    });
  }
});