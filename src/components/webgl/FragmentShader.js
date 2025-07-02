const FragmentShaderSource = `
precision mediump float;

uniform vec2  uResolution;
uniform float uTime;

const int marchSteps = 64;
const int oceanOctaves = 4;

const mat2 rotation2D  = mat2(0.80, 0.60, -0.60, 0.80);
const mat2 rotation2Di = mat2(0.80, -0.60, 0.60, 0.80);

const vec3 oceanAmbeint = vec3(0.1, 0.6, 0.8) * 0.1;
const vec3 oceanDiffuse = vec3(0.1, 0.6, 0.8);
const vec3 oceanSpecular = vec3(1.0, 1.0, 1.0) * 0.6;

const vec3 skyColor = vec3(0.4, 0.3, 0.5) * 0.5;
const vec3 skyColorDark = vec3(0.1, 0.1, 0.3) * 0.5;

const vec3 lightDirection = normalize(vec3(0.35, 0.3, -0.6));
const vec3 lightColor = vec3(0.9, 0.8, 0.55) * 0.5;

const float maxDistance = 30.0;

float hash(vec2 pos){
    float val = dot(pos, vec2(196.4, 546.9));
    return fract(sin(val) * 45125.2976);
}

// result .x = value noise .yz = 2 direction derivatives 
vec3 oceanValueNoise(vec2 pos){
    vec2 i = floor(pos);
    vec2 f = fract(pos);
    vec2 u = f*f*(3.0-2.0*f); // 3x^2 - 2x^3
    vec2 du = 6.0*f*(1.0-f);  // 6x - 6x^2

    float a = hash(i + vec2(0.0, 0.0));
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    float k0 = a;
    float k1 = b-a;
    float k2 = c-a;
    float k3 = a-b-c+d;

    // bilinear interpolation (((d-c)*ux + c) - ((b-a)*ux + a))*uy + (b-a)*ux + a
    return vec3(-1.0 + 2.0 * (k0 + k1*u.x + k2*u.y + k3*u.x*u.y),
                2.0 * du * vec2(k1 + k3*u.y, k2 + k3*u.x));
}

vec3 oceanFBM(vec3 pos){    
    float lacunarity = 1.9;
    float gain = 0.38;
    float amplitude = 0.06;
    float height = 0.0;
    vec2 derivative = vec2(0.0, 0.0);
    mat2 reverseMat = mat2(1.0, 0.0, 0.0, 1.0);

    vec2 uv = pos.xz;

    for(int i=0; i<oceanOctaves; i++){
        // add offset on each octaves makes the high frequency components move faster than lower freq
        vec2 animatedUV = uv + vec2(uTime * 0.6, uTime * 0.5);
        vec3 noise = oceanValueNoise(animatedUV);
        height += amplitude*noise.x;                 // accumulate values		
        derivative += amplitude*reverseMat*noise.yz; // accumulate derivatives
        amplitude *= gain;
        uv = lacunarity*rotation2D*uv;
        reverseMat = lacunarity*rotation2Di*reverseMat;
    }

	return vec3(pos.y - height, derivative);
}

float diffuse(vec3 light, vec3 normal) {
    return max(dot(light, normal), 0.0);
}
float specular(vec3 light, vec3 normal, vec3 rayDirection, float shiness) {    
    return pow(max(dot(reflect(rayDirection, normal), light), 0.0), shiness);
}

vec3 getOceanColor(vec3 pos, vec3 normal, vec3 rayDirection, float distance) {  
    vec3 diffuseColor = oceanDiffuse * diffuse(lightDirection, normal) * skyColor;
    vec3 specularColor = oceanSpecular * specular(lightDirection, normal, normalize(rayDirection), 10.0);

    vec3 color = oceanAmbeint + diffuseColor + specularColor * lightColor;
    //float atten = max(1.0 - distance * 0.001, 0.0);
    //color += oceanBaseColor * (pos.y) * 0.18 * atten;
        
    return color;
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;
    
    vec3 rayOrigin = vec3(0.0, 1.0, 3.0);
    vec3 rayDirection = normalize(vec3(uv, -1.0));
    
    vec3 color = vec3(0);

    float totalDistance = 0.0; // distance travelled

    vec3 oceanMotion = vec3(0.0);

    for(int i=0; i<marchSteps; i++){
        vec3 pos = rayOrigin + rayDirection * totalDistance;

        oceanMotion = oceanFBM(pos);

        float nextDistance = oceanMotion.x;

        // since the return ocean map function is distance to surface at (x,z) not actually the shortest distance, optimize the next step
        totalDistance += nextDistance * 0.8 * (1.0 - 0.75 * clamp(length(oceanMotion.yz), 0.0, 0.5));
        
        if(nextDistance < 0.0001)
            break;

        if(nextDistance > maxDistance){
            totalDistance = maxDistance + 1.0;
            break;
        }
    }

    vec3 pos = rayOrigin + rayDirection * totalDistance;
    // sea surface implicit function F(x,y,z)=y-h(x,z)=0
    // normal vector = ∇F = (-∂x, 1.0, -∂z);
    vec3 normal = normalize(vec3(-oceanMotion.y, 1.0, -oceanMotion.z));

    //color = vec3(totalDistance * 0.05);
    if(totalDistance > maxDistance){
        float blendFactorY = (rayDirection.y + 1.0) * 0.5;
        blendFactorY = smoothstep(0.2, 1.0, blendFactorY);
        float blendFactorX = (rayDirection.x + 1.0) * 0.5;
        blendFactorX = smoothstep(0.0, 1.0, blendFactorX); 
        color = mix(mix(skyColor, skyColorDark, blendFactorY), skyColor, -blendFactorX);
    }
    else{
        color = getOceanColor(pos, normal, rayDirection, totalDistance);
    }

    gl_FragColor = vec4(color, 1.0);
}
`

export default FragmentShaderSource;