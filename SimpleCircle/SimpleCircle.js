function drawCircle() {
    
    var canvas=document.getElementById("gl-canvas");
    var gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    var arrayOfPointsForCircle=[];
    
    // Enter array setup code here
    // Use the implicit form of the circle equation here:
    // (x-a)^2 + (y-b)^2 = r^2.

	var xend = 1.0;
	var xstart = -1.0;
	var n = 101;
	var xstep = (xend-xstart)/(n-1.0);

	var x = 0.0;
	var y = 0.0;
	var i = 0;

	for ( i = 0; i < n; i++ )
	{
		x = xstart + i * xstep;
		y = Math.sqrt( 1.0 - x * x );
		var p = vec2( x, y );
		arrayOfPointsForCircle.push( p );
	}
	for ( i = 0; i < n; i++ )
	{
		x = xstart + i * xstep;
		y = -Math.sqrt( 1.0 - x * x );
		var p = vec2( x, y );
		arrayOfPointsForCircle.push( p );
	}
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPointsForCircle), gl.STATIC_DRAW );
    
    var myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
    // Enter draw arrays code here
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 2 * n );
}

