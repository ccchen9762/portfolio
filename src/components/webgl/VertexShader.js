const VertexShaderSource = `
attribute vec4 aPosition;

void main() {
    gl_Position = aPosition;
}
`

export default VertexShaderSource;