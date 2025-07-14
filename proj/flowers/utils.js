function removeAtIndex(arr, index){
	var clipped = [];
	let reps = arr.length;
	for (var r = 0; r < reps; r++){
		if(r != index){
			clipped.push(arr[r]);
		}
	}
	return clipped;
}
function removeItem(arr, item){
	var clipped = arr;
	let reps = clipped.length;
	for (var r=0; r< reps; r++){
		if(clipped[r] == item){
			clipped = removeAtIndex(clipped, r);
			r=0;
		}
	}
	return clipped;
}
function removeDupes(arr){
	var filtered = arr.filter(function(item, pos) {
			return arr.indexOf(item) == pos;
		})
	return filtered;
}

function colorLerp(rgb1, rgb2, percent){
	let newRgb = {r:0, g: 0, b:0};
	let q = 1 - percent;
	newRgb.r = rgb1.r * q + rgb2.r * percent;
	newRgb.g = rgb1.g * q + rgb2.g * percent;
	newRgb.b = rgb1.b * q + rgb2.b * percent;
	return newRgb;
}