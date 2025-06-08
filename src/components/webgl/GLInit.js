import { mat4 } from 'gl-matrix';

// Helper function to compile a shader
function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Helper function to create a WebGL program
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking failed:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// Main initialization function for WebGL
export function initWebGL(canvas) {
  const gl = canvas.getContext('webgl');
  if (!gl) {
    console.error('WebGL is not supported by your browser.');
    return null;
  }

  // --- Shaders ---
  const vertexShaderSource = `
    attribute vec3 a_position;
    uniform mat4 u_modelViewProjectionMatrix;

    void main() {
      gl_Position = u_modelViewProjectionMatrix * vec4(a_position, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Solid red color
    }
  `;

  const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

  if (!vertexShader || !fragmentShader) return null;

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) return null;

  gl.useProgram(program);

  // Get uniform locations
  const uniformLocations = {
    modelViewProjectionMatrix: gl.getUniformLocation(program, 'u_modelViewProjectionMatrix'),
  };

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

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const numIndices = indices.length;

  // Cleanup shaders (they are linked to the program, so can be deleted)
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return {
    gl,
    program,
    uniformLocations,
    buffers: { vertexBuffer, indexBuffer },
    numIndices,
  };
}
