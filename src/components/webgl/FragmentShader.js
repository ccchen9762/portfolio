const FragmentShaderSource = `
precision mediump float;

uniform vec2  uResolution;
uniform float uTime;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    vec3 color = vec3(0.0);
    color.r = uv.x;
    color.g = uv.y;
    color.b = abs(sin(uTime));

    gl_FragColor = vec4(color, 1.0);
}
`

export default FragmentShaderSource;