if(typeof BlockDemo == 'undefined') { BlockDemo = {}; }
var test = false;
BlockDemo = Koi.define({
    'canvas':         null,
    'gl':             null,
    'cameraDistance': null,
    
    init: function() {
        //this.canvas = document.getElementById('c');
        //this.gl     = this.canvas.getContext('experimental-webgl');
        this.cameraDistance = 5;
    },
    
    start: function() {
        var scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
        var camera = this.camera;
        

        var renderer = new THREE.WebGLRenderer({ antialias: true, shadowMapEnabled: true, shadowMapSoft: true });
        renderer.setClearColorHex(0x000000, 1);
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        
        // Set the Mood lighting
        //var mood_light = new THREE.AmbientLight( 0x404040 ); // soft white light
        //scene.add( mood_light );
        
        
        // Lets add some tiles
        var grass = new GrassTile();
        //scene.add( grass.mesh );
        
        var addgrass = function( x, y, z ) {
            var g = new GrassTile();
            x -= 2;
            z -= 2;
            g.mesh.position.x = x;
            g.mesh.position.y = y;
            g.mesh.position.z = z;
            scene.add( g.mesh );
            return g;
        };
        
        var addlight = function(x,y,z, target) {
            var light = new THREE.SpotLight( 0xffffff, 1.2);
            light.castShadow = true;
            light.shadowDarkness = 0.5;
            light.shadowCameraVisible;
            light.shadowCameraNear = 0.01;
            light.shadowCameraVisible = true;
            light.position.set(x, y, z);
            light.target = target;
            scene.add( light );
            
            //var helper = new THREE.SpotLightHelper( light );
            //scene.add(helper);
            return light;
        };
        
        //addlight(0,5,0, 0, 10, 0);
        addlight(2,8,2, scene);
        addlight(4,2,4, scene);
        //addlight(-10,-10,50);
        
        var rows  = 5;
        var slots = 5;
        
        for(var i = 0; i < rows; i++) {
            for(var n = 0; n < slots; n++) {
                addgrass(i, 1, n);
            }
        }
        
        addgrass(2, 1.25, 2);
        addgrass(3, 1.25, 3);
        addgrass(1, 1.25, 4);
        addgrass(1, 1.50, 4);
        addgrass(4, 1.25, 4);
        
        //camera.position.z = 8;
        camera.position.y = 5;
        
        //camera.position.z = 2;
        //camera.position.y = 1;
        camera.lookAt( grass.mesh.position );
              console.log(camera);   
        var angle = 0;
        var _this = this;
        var render = function() { 
            requestAnimationFrame(render);
            //cube.rotation.x += 0.05; 
            //cube.rotation.y += 0.02;
            //camera.position.z = camera.position.x + (2*3.14);

            //camera.lookAt(grass.mesh.position);
            
            // Set the camera to always point to the centre of our scene, i.e. at vector 0, 0, 0
              //camera.lookAt( scene.position );

            if(1) {
                angle += 0.01;
                if(angle > 360) { angle = 0; }

                camera.lookAt({ x: 0, y: 0, z: 0  }); 
                camera.position.z = (Math.cos( angle ) * _this.cameraDistance);
                camera.position.x = (Math.sin( angle ) * _this.cameraDistance);
            }
            renderer.render(scene, camera);
        };
        
        render();
    },
    
    render: function() { 
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    } 
});

var demo = false;
window.onload = function() {
    demo = new BlockDemo();
    demo.start();
}
