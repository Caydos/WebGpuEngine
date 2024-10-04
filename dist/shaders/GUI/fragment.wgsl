@group(0) @binding(0) var imguiTexture: texture_2d<f32>;
@group(0) @binding(1) var imguiSampler: sampler;

struct FragmentInput {
  @location(0) fragUV: vec2<f32>,
  @location(1) fragColor: vec4<f32>,
};

@fragment
fn main(input: FragmentInput) -> @location(0) vec4<f32> {
  let texColor = textureSample(imguiTexture, imguiSampler, input.fragUV);
  return texColor * input.fragColor;
}
