function print_array(Arry) {
    ///
    /// Pretty print a 2D array.
    ///
    strOut = "";
    for (point in Arry) {
        strOut+="("+Arry[point]+")";
    }
    print(strOut);
}

function min(a, b) {
    ///
    /// Finds the minimum of 2 numbers
    ///
    return (a<b?a:b);
}

function swap(i, j, Arr) {
    ///
    /// Swap two items in an array
    ///
    temp = Arr[i];
    Arr[i] = Arr[j];
    Arr[j] = temp;
}

function square(input) {
    ///
    /// Determines the square of a number
    /// 
    return (input*input);
}

function distance(Point0, Point1) {
    ///
    /// Determine the distance between two points using Pythagoras' theorem
    ///
    return (Math.sqrt(square(Point0[0] - Point1[0]) + square(Point0[1] - Point1[1])))
}

function round_trip(Arr) {
    ///
    /// Find the overall length of a round trip given a set of points
    ///
    start = Arr[0];
    distance_travelled = 0;
    for (i = 0; i<(Arr.length-1); i++) {
        distance_travelled += distance(Arr[i], Arr[(i+1)]);
    }
    distance_travelled += distance(Arr[(Arr.length-1)], start);
    return distance_travelled;
}
// A route to analyse 
route = [[1,2],[3,4],[4,5],[6,7],[8,9],[10,11],[12,13],[1,1],[2,2],[10,10],[11,11],[1,10],[2,13],[3,14],[4,9],[16,7],[10,1],[32,17],[40,2],[22,13],[1,8],[10,13],[11,2],[14,9],[15,3]];

function one_gen(Arr, current_min, before) {
    return [current_min, before]
}

function approx_min(Arr) {
    current_min = [Number.POSITIVE_INFINITY,[]];
    before = 0;
    for  (i = 0; i<Arr.length; i++) {
        for (j = i; j<Arr.length; j++) {
            before = round_trip(Arr);  // Distance before
            swap(i, j, Arr);         // Perform swap
            after = round_trip(Arr);
            st = current_min[0]
            current_min[0]=min(current_min[0], min(before,after));
            if (st>current_min[0]) {
                current_min[1] = Arr
            }
            if (before > after) {
                // We've made it worse, swap back
                swap(i, j, Arr);
            }
        }
    }
    return current_min;
}

curr_min = [Number.POSITIVE_INFINITY,[]];
for (l = 0; l<5000; l++) {
    itemp = approx_min(route);
    if (itemp[0] < curr_min[0]) {
       curr_min = itemp;
    }
}

print(curr_min[0]);
print_array(curr_min[1]);

