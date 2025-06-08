import React, { useEffect, useRef, useCallback } from 'react';
import { mat4 } from 'gl-matrix'; // Import mat4 from gl-matrix

function OceanCanvas() {
  const canvasRef = useRef(null);       // Reference to the canvas DOM element
  const glRef = useRef(null);          // Reference to the WebGL rendering context
  const programRef = useRef(null);     // Reference to the WebGL program
  const vertexBufferRef = useRef(null); // Reference to the vertex buffer
  const indexBufferRef = useRef(null); // Reference to the index buffer
  const numIndicesRef = useRef(0);     // Number of indices to draw
  const animationFrameId = useRef(null); // Stores the ID of the requestAnimationFrame
  const uniformLocationsRef = useRef({}); // Stores locations of uniform variables in the shader

  // Function to initialize WebGL and draw
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    glRef.current = gl; // Store the context for later use

    if (!canvas || !gl)
      return;

    // --- Processing Shaders ---
    // Vertex Shader Source (GLSL) - now handles 3D positions
    const vertexShaderSource = `
      attribute vec3 a_position; // 3D position
      uniform mat4 u_modelViewProjectionMatrix;

      void main() {
        gl_Position = u_modelViewProjectionMatrix * vec4(a_position, 1.0);
      }
    `;

    // Fragment Shader Source (GLSL) - fixed red color
    const fragmentShaderSource = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Solid red color
      }
    `;

    // Compile Vertex Shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader));
      return;
    }

    // Compile Fragment Shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    // Create and Link Program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program; // Store the program

    // Get uniform locations
    uniformLocationsRef.current.modelViewProjectionMatrix = gl.getUniformLocation(program, 'u_modelViewProjectionMatrix');


    // --- Cube Data and Buffer Setup ---
    const vertices = new Float32Array([
      // Front face
      -0.5, -0.5,  0.5, // 0
       0.5, -0.5,  0.5, // 1
       0.5,  0.5,  0.5, // 2
      -0.5,  0.5,  0.5, // 3

      // Back face
      -0.5, -0.5, -0.5, // 4
       0.5, -0.5, -0.5, // 5
       0.5,  0.5, -0.5, // 6
      -0.5,  0.5, -0.5, // 7
    ]);

    const indices = new Uint16Array([
      // Front face
      0, 1, 2,
      0, 2, 3,
      // Right face
      1, 5, 6,
      1, 6, 2,
      // Back face
      5, 4, 7,
      5, 7, 6,
      // Left face
      4, 0, 3,
      4, 3, 7,
      // Top face
      3, 2, 6,
      3, 6, 7,
      // Bottom face
      4, 5, 1,
      4, 1, 0,
    ]);

    // Create and bind vertex buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    vertexBufferRef.current = vertexBuffer; // Store buffer

    // Create and bind index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    indexBufferRef.current = indexBuffer; // Store buffer
    numIndicesRef.current = indices.length; // Store number of indices

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  }, []); // No dependencies, runs once on mount

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;

    if (!canvas || !gl) return;

    // Get the actual display size of the canvas element
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas drawing buffer size needs to be updated
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }, []); // No dependencies, as it uses refs

  const drawScene = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const numIndices = numIndicesRef.current;
    const uniformLocations = uniformLocationsRef.current;

    if (!gl || !program || numIndices === 0) return;

    // Clear the canvas with a dark grey background
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear depth buffer too for 3D

    // Enable depth testing for 3D objects
    gl.enable(gl.DEPTH_TEST);

    // Use the compiled program
    gl.useProgram(program);

    // Bind the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferRef.current);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the index buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferRef.current);

    // --- Calculate Matrices using gl-matrix ---
    const projectionMatrix = mat4.create();
    const modelMatrix = mat4.create();
    const modelViewProjectionMatrix = mat4.create();

    // Perspective Projection Matrix: maintains aspect ratio
    const fieldOfView = (45 * Math.PI) / 180; // 45 degrees in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Model Matrix: for position (no rotation applied here)
    mat4.identity(modelMatrix);
    // Translate the cube slightly back so it's visible in perspective
    // mat4.translate(out, a, v) where out=a, v is the translation vector
    mat4.translate(modelMatrix, modelMatrix, [0.0, 0.0, -2.0]);

    // Combine matrices: Projection * Model (order matters!)
    mat4.multiply(modelViewProjectionMatrix, projectionMatrix, modelMatrix);

    // Pass the combined matrix to the shader
    gl.uniformMatrix4fv(uniformLocations.modelViewProjectionMatrix, false, modelViewProjectionMatrix);

    // Draw the cube using indices
    gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_SHORT, 0);
  }, []);

  // The main animation loop function
  const animate = useCallback(() => {
    resize(); // Ensure canvas size and viewport are correct before drawing
    drawScene();    // Draw the current frame

    // Request the browser to call 'animate' again before the next repaint.
    animationFrameId.current = requestAnimationFrame(animate);
  }, [resize, drawScene]); // Dependencies: handleResize and drawScene

  useEffect(() => {
    initWebGL();
    animate();
    window.addEventListener('resize', resize);

    // cleanup when component unmounts
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId.current);
      const gl = glRef.current;
      if (gl) {
        // Release WebGL resources
        gl.deleteBuffer(vertexBufferRef.current);
        gl.deleteBuffer(indexBufferRef.current);
        gl.deleteProgram(programRef.current);
      }
    };
  }, [animate, resize]); // Dependencies to ensure useEffect runs when these change (though they are useCallback with no deps)

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover z-0"/>;
}

export default OceanCanvas;