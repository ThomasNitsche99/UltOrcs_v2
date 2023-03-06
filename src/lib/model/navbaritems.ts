export class NavbarItem {
	value: string = '';
	href = '';

	constructor(value: string, href: string) {
		this.value = value;
		this.href = href;
	}
}

export class NavbarData {
	items: NavbarItem[] = [];
	activeItem: string = "";

	constructor(items: NavbarItem[]) {
		this.items = items;
		
	}

	setActiveItem(item: string) {
		this.activeItem = item;
	}

    getActiveItem(){
        return this.activeItem;
    }
}
