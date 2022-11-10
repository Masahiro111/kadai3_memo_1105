import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.title = this.elements.root.querySelector(".kanban__column-title");
		this.elements.items = this.elements.root.querySelector(".kanban__column-items");
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		this.elements.items.appendChild(topDropZone);

		this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");

			this.renderItem(newItem);
		});

		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__column flex flex-1 flex-col flex-shrink-0 w-72">

				<div class="flex items-center flex-shrink-0 h-6 mt-8">
					<span class="kanban__column-title block text-sm font-semibold"></span>
				</div>

				<div class="flex flex-col pb-2 overflow-auto">
					<div class="kanban__column-items"></div>
				</div>

				<button class="kanban__add-item -mt-2 w-full py-3 bg-gradient-to-tr from-indigo-300 to-purple-300 hover:from-indigo-500 hover:to-purple-500 text-white border-0 rounded-md cursor-pointer" type="button">+ Add</button>
			</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}
}
