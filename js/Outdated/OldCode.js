function removeAll() {
        graph.dispose();
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        graph.draw(ctx);
    }
    function removeRandomSegment() {
        if (graph.segments.length == 0) {
            console.log("No segments!");
            return;
        }
        const index = Math.floor(Math.random() * graph.segments.length);
        graph.removeSegment(graph.segments[index]);
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        graph.draw(ctx);
    }

    function removeRandomPoint() {
        if (graph.points.length == 0) {
            console.log("No points!");
            return;
        }
        const index = Math.floor(Math.random() * graph.points.length);
        graph.removePoint(graph.points[index]);
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        graph.draw(ctx);
    }

    function addRandomSegment() {
        const index1 = Math.floor(Math.random() * graph.points.length);
        const index2 = Math.floor(Math.random() * graph.points.length);
        const success = graph.tryAddSegment(
            new Segment(graph.points[index1], graph.points[index2])
        );
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        graph.draw(ctx);
        console.log(success);
    }
    function addRandomPoint() {
        const success = graph.tryAddPoint(
            new Point(
                Math.random() * myCanvas.width,
                Math.random() * myCanvas.height
            )
        );
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        graph.draw(ctx);
        console.log(success);
    }