function circlePointCheck(circle, point){
	//circle expects (x, y, radius)
	//point expects (x, y)
	let deltaX = circle.x - point.x;
	let deltaY = circle.y - point.y;
	return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius)
}
function rectangleCircleCheck(circle, rectangle){
	//circle expects (x, y, radius)
	//rectangle expects (x, y, width, height)
	let deltaX = circle.x - Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.width));
	let deltaY = circle.y - Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.height));
	return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius);
}

function checkCraftable(item, inventory){
	let craftable = false;
	for(const [key, value] of Object.entries(item.cost)){
		if(game.player.inventory[key] >= value){
			craftable = true;
		}
		else{
			craftable = false;
			break;
		}
    }
	return craftable;
}