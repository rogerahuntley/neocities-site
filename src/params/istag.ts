/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return isNaN(parseInt(param)) && !param.includes('/') && !param.includes('.');
}