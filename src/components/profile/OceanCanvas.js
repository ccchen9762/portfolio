import React, { useEffect, useRef, useCallback } from 'react';
import VertexShaderSource from '../webgl/VertexShader';
import FragmentShaderSource from '../webgl/FragmentShader';

function OceanCanvas() {
  const canvasRef = useRef(null);
  const webglContextRef = useRef(null);
  const programRef = useRef(null);
  const animationFrameId = useRef(null);
  const positionBufferRef = useRef(null);
  const startTimeRef = useRef(0);
  const mountedRef = useRef(false);

  // Function to initialize WebGL and draw
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2');
    webglContextRef.current = gl;

    if (!canvas){
      console.error("Canvas error on initWebGL.")
      return;
    }
    if (gl === null){
      console.error("Unable to initialize WebGL. This browser may not support it.")
      return;
    }

    // Compile Vertex Shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, VertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vertexShader));
      return;
    }
    // Compile Fragment Shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, FragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    // Create and Link Program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    // cleanup
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    // check error
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.useProgram(null);
      gl.deleteProgram(program);
      return;
    }
    programRef.current = program;

    gl.useProgram(program); // need to be active to setup attributes and uniforms

    program.attributes = {
      position: gl.getAttribLocation(program, 'aPosition'),
    };

    program.uniforms = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
    };

    startTimeRef.current = performance.now();
  }, []);

  const initPositionBuffer = useCallback(() => {
    const gl = webglContextRef.current;
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    positionBufferRef.current = positionBuffer;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = webglContextRef.current;

    if (!canvas){
      console.error("Canvas error on resize.");
      return;
    }
    if (!gl){
      console.error("gl context error on resize.");
      return;
    }

    // Get the actual display size of the canvas element
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas drawing buffer size needs to be updated
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }, []);

  const render = useCallback(() => {
    const gl = webglContextRef.current;
    const program = programRef.current;
    const positionBuffer = positionBufferRef.current;

    if (!gl){
      console.error("gl context error on render.");
      return;
    }
    if (!program){
      console.error("program error on render.");
      return;
    }

    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTimeRef.current) / 1000.0;

    gl.uniform2f(program.uniforms.resolution, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(program.uniforms.time, elapsedTime);

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear depth buffer for 3D

    // Enable depth testing for 3D objects
    //gl.enable(gl.DEPTH_TEST);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Get the location of the 'aPosition' attribute in vertex shader
    gl.vertexAttribPointer(program.attributes.position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.attributes.position);

    gl.useProgram(program);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    initWebGL();
    initPositionBuffer();
    resize();

    const animate = () => {
      if (!mountedRef.current) {
        return;
      }
      render();
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);

    // cleanup when component unmounts
    return () => {
      mountedRef.current = false;

      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resize);

      const gl = webglContextRef.current;
      if (gl) {
        gl.deleteBuffer(positionBufferRef.current);
        gl.deleteProgram(programRef.current);
      }
    };
  }, [initWebGL, initPositionBuffer, render, resize]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover z-0"/>;
}

export default OceanCanvas;