
interface FileFilter {
    boolean accept();
}

File dir = new File();
public File[] listFile(FileFilter filter) {

   ...
   ArrayList<> result = ...;
    for(int i = 0, len = files.length; i < len; ++i) {
        File file = files.get(i);
        if(filter.accept()) {
            result.add(file);
        }
    }
    return result;
}


JS:

const accept = function() {
    ...
    return true;
}

listFile(accept) {
    ...

}

更过分地,

listFile(function() {

}) {


}