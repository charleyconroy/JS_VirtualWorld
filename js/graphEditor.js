class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.ctx = this.canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousedown", (evt) => {
            if (evt.button == 2) { //right click
                //unselect the point if selected, remove it if not
                if (this.selected) {
                    this.selected = null;
                } else if (this.hovered) {
                    this.#removePoint(this.hovered);
                }
            }
            if (evt.button == 0) {//left click
                // if hovering over a point select it, return to not add a point
                if (this.hovered) {
                    this.#select(this.hovered);
                    this.selected = this.hovered;
                    this.dragging = true;
                    return;
                }
                // if not hovering over a point add a point
                this.graph.addPoint(this.mouse);
                this.#select(this.mouse);
                this.hovered = this.mouse;
            }
        });

        //when moving the mouse be able to drag points
        this.canvas.addEventListener("mousemove", (evt) => {
            this.mouse = new Point(evt.offsetX, evt.offsetY);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
            if (this.dragging ==  true) {
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        });

        //when no longer holding click stop dragging
        this.canvas.addEventListener("mouseup", () => this.dragging = false);

        // stop the context menu from showing up when right clicking
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
    }

    //If you select a point try to add a segment
    #select(point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    // If you right click on a point it removes it from the graph
    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point) {
            this.selected = null;
        }
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            this.hovered.draw(this.ctx, {fill: true});
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, intent).draw(this.ctx, {dash: [3,3]});
            this.selected.draw(this.ctx, {outline: true});
        }
    }



}