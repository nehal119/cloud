const fun = () => {
    console.time("loop start");
    for (var i = 0; i < 1000000; i += 1){
        console.time(i);
    }
    console.timeEnd("loop end");
}

fun();
