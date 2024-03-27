<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $questions = explode(',',$_POST['q']);
        $answers = explode(',',$_POST['a']);
        $data = [
            '1'=>'d',
            '2'=>'b',
            '3'=>'a',
            '4'=>'d',
            '5'=>'b',
            '6'=>'c',
            '7'=>'b',
            '8'=>'d',
            '9'=>'b',
            '10'=>'d',
            '11'=>'d',
            '12'=>'d',
        ];
        $score = 0;
        $i=0;
        $l = count($questions);
        while($i<$l) {
            if($answers[$i]==$data[$questions[$i]]) {
                $score++;
            }
            $i++;
        }
    }
    header('Content-Type: application/json');
    $response =['score'=>$score];
    echo json_encode($response);
?>