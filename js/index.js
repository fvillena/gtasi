$(document).ready(function(){
    function isBetween(n, a, b) {
        return (n - a) * (n - b) <= 0
     }
    function sum(ft, e, wh) {
        return ft + e + wh
      }
    function partial_total(p, s, a) {
        return p * s * a
      }
    function validate(id, v, m) {
        if (isBetween(v,0,m)) {
            $(id).removeClass("is-invalid").addClass("is-valid")
            valid_form = true
        } else if ($(id).val() == "") {
            $(id).removeClass("is-invalid").removeClass("is-valid")
            valid_form = false
        } else {
            $(id).removeClass("is-valid").addClass("is-invalid")
            valid_form = false
        }
        return valid_form
      }
    function items(obj) {
        var i, arr = [];
        for(i in obj) {
          arr.push(obj[i]);
        }
        return arr;
       }
    function calculate(part) {
        p = parseFloat($("#"+part+"-percentage").text())
        fissured_tongue = parseInt($("#"+part+"-fissured_tongue").val())
        fissured_tongue_valid = validate("#"+part+"-fissured_tongue",fissured_tongue,1)

        erythema = parseInt($("#"+part+"-erythema").val())
        erythema_valid = validate("#"+part+"-erythema",erythema,4)

        area_score = parseInt($("#"+part+"-area_score").val())
        area_score_valid = validate("#"+part+"-area_score",area_score,6)

        white_halo = parseInt($("#"+part+"-white_halo").val())
        white_halo_valid = validate("#"+part+"-white_halo",white_halo,4)

        if (fissured_tongue_valid & erythema_valid & white_halo_valid) {
            part_sum = sum(
                fissured_tongue,
                erythema,
                white_halo,
            )
            $("#"+part+"-sum").text(part_sum)
        } else {
            $("#"+part+"-sum").text("")
        }

        if (fissured_tongue_valid & erythema_valid & white_halo_valid & area_score_valid) {
            part_partial_total = partial_total(
                p,
                part_sum,
                area_score
            )
            $("#"+part+"-partial_total").text(Math.round(part_partial_total * 1000) / 1000)
            total_values[part] = part_partial_total
        } else {
            $("#"+part+"-partial_total").text("")
            total_values[part] = NaN
        }
    }
    total_values = {
        apex: NaN,
        borders: NaN,
        lingual_belly: NaN,
        dorsum: NaN
    }
    $("input").change(function(){
        calculate("apex")
        calculate("borders")
        calculate("lingual_belly")
        calculate("dorsum")
        total = items(total_values).reduce((a, b) => a + b, 0)
        if (total) {
            $("#result").show()
            $("#total").text(Math.round(total * 1000) / 1000)
            if (total >= 12) {
                $("#score").text("Severe")
            } else if (total >= 7) {
                $("#score").text("Moderate")
            } else {
                $("#score").text("Mild")
            }
        } else {
            $("#result").hide()
        }
    });

  });