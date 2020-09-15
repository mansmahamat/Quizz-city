let app = {
    counterQuestion: 0,
    counterGoodAnswer: 0,
  
    init: function() {
      app.loadData()
  
      $('#btnCheckAnswer').on('click', app.checkAnswer )
      $('.message .close').on('click', app.hideValidationMessage)
      $('#nextQuestion').on('click', app.nextQuestion)
    },
  
    randomNumber: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      randNumb = Math.floor(Math.random() * (max - min +1)) + min;  
      return randNumb  
    },
  
    countPoint: function() {
      $('.totall').text(app.counterQuestion)
      $('.scoree').text( app.counterGoodAnswer)
      
      if (app.counterGoodAnswer === 10){
        swal("Bien joué 👏");
      }
      if (app.counterGoodAnswer === 20){
        swal("SUPER 👏");
      }
     /* console.log(app.counterQuestion)
      console.log(app.counterGoodAnswer) */

    },
  
    addPoint: function() {
      app.counterGoodAnswer++
    },
    
    loadData: function() {
      $countryName = []
      $countryCapital = []
      $countryNumber = []
      $countryFlag = []
      $countryPopulation = []
      $countryCurrencies = []
      $countrySubregion = []
      
  
      app.counterQuestion++
  
      $.ajax(
        {
          url: 'https://restcountries.eu/rest/v2/all',
          method: 'GET',
          dataType: 'json'
        }
      ).done(
        function(response) 
        {
        res = response
          
        $.each(res, function(i, country) 
          {
            $countryName.push(country.translations.fr)
            $countryCapital.push(country.capital)
            $countryFlag.push(country.flag)
            $countryNumber.push(country.i)
            $countryPopulation.push(country.population)
            $countryCurrencies.push(country.currencies)
            $countrySubregion.push(country.region)
          })
  
        // générer 3 random number afin de récupérer 3 noms de capitales => fausses réponses
          badAnswers = []
          for (i = 0; i < 3; i++) {
            app.randomNumber(0, $countryNumber.length)
            badAnswers.push($countryCapital[randNumb]);
            /* console.log(randNumb) */
          }
          
          /* console.log(badAnswers) */
  
          //generer un nombre aléatoire qui va chercher dans l'array, un pays et une capital liée, ainsi que les 3 mauvaises réponses
          app.randomNumber(0, $countryNumber.length--)
          // generer une question en fonction des datas récupérées
          app.generateTheQuestion($countryName[randNumb], $countryCapital[randNumb], badAnswers)
        }
      ).fail(
        function() 
        {
          swal('Ajax loading failed');
        }
      )
  
    },
    
  
    generateTheQuestion: function(countryName, capitalName, badAnswers) {
      $('.pays').text(countryName)
      
      // Reset les class One, Two, Three, Four ajouter au tour précédent
      $("#reponse .field").removeClass('one two three four')
  
      // Ajouter au field checkbox une class One, Two, Three ou Four aléatoirement
      classes = ['one', 'two', 'three', 'four']
      $("#reponse .field").each(function(){
        $(this).addClass( classes.splice( ~~(Math.random()*classes.length), 1 )[0] );
    });
      
      // 1ere ligne => permet de modifer le label 
      // 2eme ligne => permet de modifier la value de l'input
  
      $('#reponse .one').find('label').text(capitalName)
      $('#reponse .one').find('input').attr('value', capitalName)
      $('#reponse .two').find('label').text(badAnswers[0])
      $('#reponse .two').find('input').attr('value', badAnswers[0])
      $('#reponse .three').find('label').text(badAnswers[1])
      $('#reponse .three').find('input').attr('value', badAnswers[1])
      $('#reponse .four').find('label').text(badAnswers[2])
      $('#reponse .four').find('input').attr('value', badAnswers[1])
    },
  
    checkAnswer: function(evt){
      evt.preventDefault()
      
      $val = $('.inputValue:checked').val();
      $('.formulaire').find('#btnCheckAnswer').addClass('disabled');
  
      if ($val == $countryCapital[randNumb]) 
      {
        $('.message').removeClass('dimmer')
        $('.message').addClass('positive')
        $('.message .header').text('Bonne réponse !')
        $('#nextQuestion').removeClass('dimmer')
  
        app.addPoint()
        
      } else 
      {
        $('.message').removeClass('dimmer')
        $('.message').addClass('negative')
        $('.message .header').text('Mauvaise réponse !')
        $('#nextQuestion').removeClass('dimmer')
      }
  
      app.countPoint()
  
      $('.card').removeClass('dimmer')
      $('.card').find('img').attr('src', $countryFlag[randNumb])
      $('.header-country').text($countryName[randNumb])
      $('.meta').find('.subregion').text($countrySubregion[randNumb])
      $('.card').find('.capitale').text($countryCapital[randNumb])
      $('.card').find('.habitants').text($countryPopulation[randNumb].toLocaleString())
      $('.card').find('.monnaie').text($countryCurrencies[randNumb][0]['name'] + ' - ' + $countryCurrencies[randNumb][0]['symbol'])     
  
    },
  
    hideValidationMessage: function(){
      $('.message').addClass('dimmer')
    },
  
    nextQuestion: function(evt) {
      evt.preventDefault()
      $('.formulaire')[0].reset()
  
      $('#nextQuestion').addClass('dimmer')
      $('.message').removeClass('positive negative')
      app.hideValidationMessage()
      $('.formulaire').find('#btnCheckAnswer').removeClass('disabled');
  
      app.loadData()
      
    },
  
    /* test: function() {
      console.log('test ok')
    } */
  
  };
  $(app.init);
  
  
  function toggleMe() {
   
    var e = document.getElementById('wrapper');
    if(! e.classList.contains('active')) {
       e.classList.add('active');
    }
    else {
       e.classList.remove('active');
    }
 }



