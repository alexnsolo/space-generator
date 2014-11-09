var Generator = function(darmok) {
    this.darmok = darmok;
    this.customPatterns = [];

    this.addPattern = function(name, pattern) {
        this.customPatterns[name] = pattern;
    }

    this.generateDarmok = function() {
        return this.darmok.generate();
    }

    this.generateNumber = function(pattern) {
        return (pattern.min + Math.random() * (pattern.max - pattern.min)).toFixed(2);
    }

    this.generateSelect = function(pattern) {
        var index = Math.floor(Math.random() * pattern.options.length);
        return this.generate(pattern.options[index]);
    }

    this.generateWeighted = function(pattern) {
        var weightSum = 0;
        for (var i = 0; i<pattern.options.length; ++i)
            weightSum += pattern.options[i].weight;

        var weighted = Math.random() * weightSum;
        weightSum = 0;
        for (var i = 0; i<pattern.options.length; ++i) {
            weightSum += pattern.options[i].weight;
            if (weighted < weightSum)
                return pattern.options[i].value;
        }
    }

    this.generateArray = function(pattern) {
        var itemPattern = pattern.itemPattern;
        var numItems = Math.round(Math.random() * (pattern.max - pattern.min));
        var array = new Array(numItems);
        for (var i = 0; i<numItems; ++i) {
            array[i] = this.generate(itemPattern);
        }
        return array;
    }

    this.generate = function(pattern) {
        // A string is the name of a custom pattern
        if (typeof pattern === 'string') {
            var customPattern = this.customPatterns[pattern];
            if (customPattern) {
                var object = this.generate(customPattern);
                object.type = pattern;
                return object;
            }
            return pattern;
        }

        // Match this pattern against standard patterns
        if (pattern.type) {
            switch (pattern.type) {
                case 'number':
                    return this.generateNumber(pattern);
                case 'select':
                    return this.generateSelect(pattern);
                case 'weighted':
                    return this.generateWeighted(pattern);
                case 'array':
                    return this.generateArray(pattern);
                case 'darmok':
                    return this.generateDarmok(pattern);
            }
        }

        // Create a custom object, patterning each property of the object
        var generated = {};
        for (var property in pattern) {
            if (!pattern.hasOwnProperty(property)) {
                continue;
            }
            generated[property] = this.generate(pattern[property]);
        }
        return generated;
    }

}

module.exports = Generator;