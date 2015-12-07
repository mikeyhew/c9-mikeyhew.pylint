define(function(require, exports, module) {
    main.consumes = ["jsonalyzer"];
    main.provides = [];
    return main;

    function main(options, imports, register) {
        var jsonalyzer = imports.jsonalyzer;
        var p1 = new Promise(function (resolve, reject) {
            jsonalyzer.unregisterServerHandler(
                "plugins/c9.ide.language.jsonalyzer/server/handlers/jsonalyzer_py_server",
                function (err) { if (err) reject(err); else resolve();}
            );
        });
        
        var p2 = new Promise(function (resolve, reject) {
            jsonalyzer.unregisterWorkerHandler(
                "plugins/c9.ide.language.jsonalyzer/worker/handlers/jsonalyzer_py",
                function (err) { if (err) reject(err); else resolve();}
            );
        });
        
        Promise.all([p1,p2]).then(function () {
            console.log("python handlers deregistered");
            
        }, function (err) {
            console.error("ERROR in deregistering handlers:");
            console.error(err);
            console.error(err.stack);
        }).then(function () {
            return new Promise(function (resolve, reject) {
                jsonalyzer.registerServerHandler(
                    "plugins/mikeyhew.pylint/pylint_server"
                    , function (err) { if (err) reject(err); else resolve(); }
                );
            });
        }).then(function () {
            console.log("registered new handler");
            register(null, {});
        }).catch(function (err) {
            console.error("ERROR in registering new handler");
            console.error(err);
            console.error(err.stack);
        });
    }
});