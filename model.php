<?php

include "conn.php";

//list param 0=>no any param, 1=>multiple param, 2=>all data in json, 3=>the param only(a poi,b type, c lokasi)
if($_POST['status']==0){
	normalQuery();	
}
elseif($_POST['status']==2){
	allQuery();
}
elseif($_POST['status']==3){
	allParam();
}
elseif($_POST['status']==1){
	ParamQuery();
}
else{
	
}


function normalQuery() {
    global $conn;
    
    $sql = "SELECT review FROM ReviewTripadvisor";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		echo 'start normal';
		while($row = $result->fetch_assoc()) {
			echo "" . $row["review"]. " ";
		}
		echo 'end normal';
	} 
	else {
		echo "Hasilnya : 0";
	}
} 

//isi text yg brp json, all data
function allQuery() {
    global $conn;
    //~ $sql = "SELECT poi_id FROM ReviewTripadvisor where review like ".$kata;
    $sql = "SELECT * FROM ReviewTripadvisor";
	$result = $conn->query($sql);
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	print json_encode($rows);
	//~ var_dump($result);
	//~ print json_encode($result);
} 

//buat isi dropdown poi
function allParam() {
    global $conn;
    if($_POST['param']=='poi'){
		$sql = "SELECT * FROM poi group by poi_name asc";
	}
    elseif($_POST['param']=='tipe'){
		$sql = "SELECT * FROM tipe group by nama_tipe asc";
	}
    elseif($_POST['param']=='lokasi'){
		$sql = "SELECT * FROM lokasi group by lokasi asc";
	}
	else{
		$sql = '';
	}
	$result = $conn->query($sql);
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	print json_encode($rows);
} 

//result from multiple query
function ParamQuery() {
    global $conn;
    
    $query = " ";
    
	if("-"!=($_POST['poiTipe'])){
		$query = $query.' left join tipe as t on rt.mtipe like CONCAT("%", t.nama_tipe, "%") ';
	}
	
    if("-"!=($_POST['poiLokasi'])){
		$query = $query.' left join lokasi as l on rt.wlocation like CONCAT("%", l.lokasi, "%") where l.id="'.$_POST["poiLokasi"].'" ';
		if("-"!=($_POST['poiTipe'])){
			$query = $query.' and t.id="'.$_POST["poiTipe"].'" ';
		}
	}
	elseif("-"!=($_POST['poiTipe'])){
		$query = $query.' where t.id="'.$_POST["poiTipe"].'" ';
	}

    //~ if($query!=" "){
		if( ("-"!=($_POST['poiId'])) || ("-"!=($_POST['lat'])) || ("-"!=($_POST['long'])) || ("-"!=($_POST['rank'])) ){
			$query = $query.' where ';	//g da query yg join2an
		}
		else{
			$query = $query.' and ';	// ada query sblmny yg join2an
		}
		
		$sign=0;
		if( ("-"!=($_POST['poiId'])) ){
			$query = $query.' rt.poi_id = "'.$_POST["poiId"].'" ';
			$sign = 1;
		}
		//tambahkan rank disini, lat itu defaultny g da, shg pasti ksini, mski 0
		if( ("-"!=($_POST['long'])) ){
			if($sign==1){
				$query = $query." and ";
			}
			$long = explode(" ~ ",$_POST['long']);
			$query = $query.' rt.wlocationlong between "'.$long[0].'" and "'.$long[1].'"';
			$sign = 1;
		}
		if( ("-"!=($_POST['lat'])) ){
			if($sign==1){
				$query = $query." and ";
			}
			$lat = explode(" ~ ",$_POST['lat']);
			$query = $query.' rt.wlocationlat between "'.$lat[0].'" and "'.$lat[1].'"';
			$sign = 1;
		}
	//~ }
	
	$query = "SELECT rt.* FROM ReviewTripadvisor as rt ".$query;
	
	echo $query;
//~ select * from Table_1 a
//~ left join Table_2 b on b.type LIKE '%' + a.type + '%'	
	
	$result = $conn->query($query);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			echo "" . $row["review"]. " ";
		}
	} 
	else {
		echo "Hasilnya : 0";
	}
} 

?>
