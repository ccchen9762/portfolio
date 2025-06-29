const FragmentShaderSource = `
precision mediump float;

uniform vec2  uResolution;
uniform float uTime;

float sdSphere(vec3 pos, float size){
    return length(pos) - size;
}

float sdBox(vec3 pos, vec3 edge){ // value of edge is half of the actaul edge
    vec3 q = abs(pos) - edge;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0); // later parts represents negative distance (inside)
}

float sdPlane(vec3 pos, vec3 normal, float h){
    return dot(pos, normal) + h;
}

// scaling: multiply the pos is to scale the space, multiply the result is to get the correct result, so the entire operation acts like the object is scaled
float map(vec3 pos) {
    vec3 spherePos = vec3(sin(uTime) * 2.0, 0.0, -3.0);
    float sphere = sdSphere(pos - spherePos, 1.0);

    vec3 q = pos;
    q = fract(pos) - 0.5;
    float box = sdBox(q, vec3(0.1));

    float ground = sdPlane(pos, vec3(0.0, 1.0, 0.0), 1.0);

    return min(sphere, min(box, ground));
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;
    
    vec3 rayOrigin = vec3(0.0, 0.0, 3.0);
    vec3 rayDirection = normalize(vec3(uv, -1.0));
    vec3 color = vec3(0);

    float totalDistance = 0.0; // distance travelled

    for(int i=0;i<80;i++){
        vec3 pos = rayOrigin + rayDirection * totalDistance;

        float nextDistance = map(pos);

        totalDistance += nextDistance;
        //color = vec3(i) / 80.0;
        
        if(nextDistance < 0.001 || nextDistance > 100.0) break;
    }

    color = vec3(totalDistance * 0.05);
    
    gl_FragColor = vec4(color, 1.0);
}
`

export default FragmentShaderSource;