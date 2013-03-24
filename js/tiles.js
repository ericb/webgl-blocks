var Tile = Koi.define({
    'mesh': null,
    
    getMesh: function() {
        return this.mesh;
    },
    
    init: function() {
        this.geometry = new THREE.CubeGeometry(1, 0.25, 1, 1, 1, 1);
    }
});

var GrassTile = Koi.extend(Tile, {
    init: function() {
        this._parent.init.apply(this, arguments);
        var grass_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture('assets/textures/grass.png'), overdraw: true } );
        var dirt_material  = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture('assets/textures/dirt.png'), overdraw: true });
        var grass_side_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture('assets/textures/side_grass.png'), overdraw: true } );
        var materials = [ grass_side_material, grass_side_material, grass_material, dirt_material, grass_side_material, grass_side_material ];
        this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshFaceMaterial(materials) );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
}, true);


var BoxTile = Koi.extend(Tile, {
    init: function() {
        this.geometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);
        var box_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture('assets/textures/box.jpg'), overdraw: true } );
        this.mesh = new THREE.Mesh( this.geometry, box_material );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
}, true);