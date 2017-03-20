var s = Snap("#svg");

Snap.load('images/ACP-shield.svg', function (f) {
    
    // elements of the svg
    var els = [];
    
    // load all parts of svg, push applicable parts to stack for hovering
    var quadKnow = f.select('#Know');
    s.append(quadKnow);
    els.push(quadKnow);
    
    var quadExplore = f.select('#Explore');
    s.append(quadExplore);
    els.push(quadExplore);
    
    var quadPlan = f.select('#Plan');
    s.append(quadPlan);
    els.push(quadPlan);
    
    var quadGo = f.select('#Go');
    s.append(quadGo);
    els.push(quadGo);
    
    var spartan = f.select('#Spartan');
    s.append(spartan);
    els.push(spartan);

    var spearRight = f.select('#SpearRight');
    s.append(spearRight);
    
    var spearLeft = f.select('#SpearLeft');
    s.append(spearLeft);

    var ribbon = f.select('#Ribbon');
    s.append(ribbon);

    // define variables for interacting with svg;
    var len = els.length;
    var frozen = false;
    var lastClick = null;
    var textAreas = [$('#textDefault'), $('#textSpartan'), $('#textKnow'), $('#textExplore'), $('#textPlan'), $('#textGo')];

    // define hover function for each part of svg
    for (var i = 0; i < len; i++) {

        // iterate through svg parts to set up hover
        els[i].hover(function() {
            
            // iterate through svg parts to dim unhovered
            for (var j = 0; j < len; j++) {
                
                // stop if frozen
                if (frozen == true) {
                    break;
                }

                // skip hovered svg part
                else if (els[j] === this) {
                    continue;
                }

                // dim unhovered svg parts
                els[j].animate({opacity: 0.2}, 300, mina.linear);
            }
        }, function() {

            // iterate through svg parts to restore dimmed
            for (var j = 0; j < len; j++) {
                
                // stop if frozen
                if (frozen == true) {
                    break;
                }
                // skip hovered part since it's not dimmed
                else if (els[j] === this) {
                    continue;
                }

                // restore all dimmed parts
                els[j].animate({opacity: 1.0}, 300, mina.linear);
            }
        });
    }

    // define click function for each part of svg
    for (var i = 0; i < len; i++) {
        els[i].click(function() {
            showText(this);
            fadeAll(this);
            
            // reset lastClick if back to default state
            if(lastClick === this) {
                lastClick = null;
            } else {
                lastClick = this;
            }
        });
    }

    // fade all unfocused parts of svg
    function fadeAll(excludeEl) {
        
        // keep focused item, fade the rest
        els.forEach(function(item, index, array) {
            if (item === excludeEl) {
                item.animate({opacity: 1.0}, 500, mina.linear);
            } else {
                item.animate({opacity: 0.2}, 500, mina.linear);
            }
        });
        
        // stop hover functions until same part is clicked consecutively
        if (lastClick === excludeEl) {
            frozen = !frozen;
        } else {
            frozen = true;
        }
    };

    // determine which text block should be active and display it
    function showText(el) {
        var text = $('#textDefault');
        
        // if in initial state when clicked, hide default segment
        if (!frozen) {
            text.fadeToggle(500);
        }
        
        // if frozen and svg part was not clicked consecutively, hide old segment
        else if (frozen && el !== lastClick) {
            textAreas.forEach(function(item, index, array) {
                if (item.css('display') !== "none") {
                    item.fadeToggle(500);
                }
            });
        }
        
        // select correct segment to display or hide
        switch (el) {
            case spartan:
                text = $('#textSpartan');
                break;
            case quadKnow:
                text = $('#textKnow');
                break;
            case quadExplore:
                text = $('#textExplore');
                break;
            case quadPlan:
                text = $('#textPlan');
                break;
            case quadGo:
                text = $('#textGo');
                break;
        }
        
        // if svg part was clicked consecutively, hide old and show default text
        if (el === lastClick) {
            text.fadeToggle(500);
            $('#textDefault').delay(500).fadeToggle(500);
        }
        
        // display new text segment since new svg part was clicked
        else {
            text.delay(500).fadeToggle(500);
        }
        
    };
    
});