function lerp(n1, n2, percent){
	let newN = 0;
	let q = 1 - percent;
    newN = n1 * q + n2 * percent;
	return newN;
}