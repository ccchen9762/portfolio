const vs = `
attribute vec3 a_position;
uniform mat4 u_modelViewProjectionMatrix;

void main() {
    gl_Position = u_modelViewProjectionMatrix * vec4(a_position, 1.0);
}
`

export default vs;