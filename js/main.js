

/*
----------------------------------------------------------------
DEFINCION DE VARIABLES
-----------------------------------------------------------------
*/

// Creamos un nuevo juego.
var juego = new Phaser.Game(370,550,Phaser.CANVAS,"gameContainer");

// creamos una variable con el fondo del juego
var fondoJuego;

// creamos un boton
var boton;

// Personaje
var flappy;

// creamos la interaccion con las teclas
var teclaDerecha;
var cursores;




/*
----------------------------------------------------------------
DEFINCION DE ESTADO PRINCIPAL
-----------------------------------------------------------------
*/

//Primer estado del juego que consta de 3 partes

var estadoPrincipal = {
    //cargar los recursos del juegos
    preload:function(){
      juego.load.image("fondo","img/bg.jpeg");
      juego.load.image("pajaro", "img/pajaro1.png");
      juego.load.image("btn", "img/btn.png");
      juego.load.spritesheet("pajaros", "img/pajaro.png",43,30); // sprites
      juego.load.spritesheet("personas", "img/persona.png",64,64);


    },
    /*
    ----------------------------------------------------------------
    CREATE FUNCTION
    -----------------------------------------------------------------
    */



    // Corre una vez que inicie el juego.Mostramos todo lo que ya precargo
    create:function(){

      //Acá asignamos a la variable fondoJuego nuestra imagen ya cargada
      // Agregamos tileSprite para que se repita
      // 0 y 0 son la posicion de "x" e "y" donde quiero poner mi imagen
      // luego la medida que es igual al fondo
      // y finalmente le asignamos un nombre

      fondoJuego = juego.add.tileSprite(0,0,370, 550,"fondo");

      //--------------------------------------------------------------------

      // Cargamos nuestro personaje

        flappy = juego.add.sprite(100,100,"pajaros");

          // definimos que comienze con el frame 1
          flappy.frame = 1;

          // acá definimos un nombre, luego un array con las 3 instancias
          // luego la velocidad, en este caso 10 cuadros por segundo
          // y finalmente le asignamos el valor true

          flappy.animations.add("vuelo",[0,1,2], 20, true);

      // flappy = juego.add.sprite(juego.width/2,juego.height/2,"pajaro");
      //     flappy.anchor.setTo(0.5);

          // para escalar una imagen le damos un valor en x e y
            flappy.scale.setTo(1,1);

          // Si quiero flipear una imagen solo debo pasarle valores negativos

              //flappy.scale.setTo(-1,1); // mirar a la izquierda
              //flappy.scale.setTo(-1,-1); // De cabeza

          // Rotaciones de sprites

              //flappy.angle = 90; // Lo rota 90º segun manillas reloj


      //--------------------------------------------------------------------

      // Agregamos el boton para Play

      // al definir juego.widht le decimos que quede justo en la mitad
       //boton = juego.add.sprite(juego.width/2, juego.height/2, "btn");

      // Anchor points son puntos de apoyo que estan en la esquina 0 0
      // Es por eso que si queremos centrarlo debemos cambiar el anchor point
      // boton.anchor.setTo(0.5);

      //--------------------------------------------------------------------

        // Definimos nuestra interaccion

        //teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        // con esto reconoce que tecla estoy presionando
        cursores = juego.input.keyboard.createCursorKeys();
          // ahora inicializaremos el juego asignandole que es tipo Arcade, asi obtendremos recursos de este tipo
            juego.physics.startSystem(Phaser.Physics.ARCADE);

              // Ahora le damos a nuestro personaje las propiedades de arcade
              juego.physics.arcade.enable(flappy);

              // ahora evitamos que salga de la pantalla
              flappy.body.collideWorldBounds = true;



    },


    /*
    ----------------------------------------------------------------
    UPDATE FUNCTION
    -----------------------------------------------------------------
    */
    update:function(){
      fondoJuego.tilePosition.x -= 1;

      //flappy.angle+=0.2; // con esto logramos que este constantemente rotando

      flappy.animations.play("vuelo");

      // interaccion
      if(cursores.right.isDown){
        flappy.position.x += 3;
      }

      if(cursores.left.isDown){
        flappy.position.x -= 3;
      }

      if(cursores.up.isDown){
        flappy.position.y -= 3;
      }

      if(cursores.down.isDown){
        flappy.position.y += 3;
      }

    }


}; //Fin estadoPrincipal


juego.state.add("principal",estadoPrincipal);
juego.state.start("principal");
