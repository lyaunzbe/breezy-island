uniform vec2 resolution;
uniform float time;
uniform float level;

vec4 makeWave(vec2 uv, vec2 o, vec2 s, vec2 v, vec4 c1, vec4 c2, vec4 ch)
{
    uv *= s;
    uv += o;
    float f = cos(uv.x+time * v.x * level) - uv.y - sin(time*v.y * level);
	return mix(ch, f>10. ? c2 : f>.0 ? mix(c1, c2, f*.1) : vec4(0.), smoothstep(.0,.02*s.y, abs(f)));
}


vec4 blend(vec4 c1, vec4 c2)
{
    return vec4(mix(c1.rgb, c2.rgb, c2.a), max(c1.a, c2.a));
}

float hash(float n)
{
    return fract(sin(n) * 123.456);
}

vec4 sun(vec2 uv, vec4 c1, vec4 c2, vec4 ch)
{
    vec4 c = vec4(0.);
    float f = length(uv) * 1.5 -  sin(atan(uv.x+ uv.y) / sin(time * level) * 10. + time * level * 10.)/ 20.;
    if (f < 1.05 && f >= 1.)
    {
        c = ch;
    }
    else if (f < 1.)
    {
        c = mix(c1, c2, f);
    }
	return c;
}

void main(  )
{
	vec2 uv = gl_FragCoord.xy / resolution.xy / .5 - 1.;
    uv.x *= resolution.x / resolution.y;

    vec4 bg = mix(vec4(.5, .6, .7, 1.), vec4(.2, .6, .9, 1.), clamp(uv.y, 0., 1.));

    bg = blend (bg, sun(uv, vec4(1., .4, .1, 1.), vec4(1., .7, .2, 1.), vec4(1.)));

    for (float i = .1; i <=1.0; i += .1)
    {
    	bg = blend(bg, makeWave(
            uv,
            vec2(hash(i) * 10., i * 10.),
            vec2(10. * (1.25 - i), 10. / i),
            vec2( i*5. + hash(i), i*3.),
            vec4(.1, .3, .5, .5), vec4(.4, .8, 1., .6), vec4(1.)));
    }

    gl_FragColor = bg;
}
