var series={
	arithmetic : (s,e) =>{
	      var sum = 0;
	      var start = s * 1;
	      var end = e * 1;
	      for (var i = start; i <= end; i++) {
	         sum += i;
	      }z
	      return sum;
	   },
	   switchSeries : ()=>{
	      var sum = 0;
	      var i=0;
	      var sw = 0;
	      do{
	         i++;
	         if(sw==0){
	            sum+=i;
	            sw=1;
	         }else{
	            sum-=i;
	            sw=0;
	         }
	      }while(i<100);
	      return sum;   
	   },
	   diffSeries : ()=>{
		   var i=0;
		   var j=1;
		   var k=1;
		   do{
			   i++;
			   j+=i;
			   k+=j;
		   }while(i<19);
		   return k;
	   },
	   factorial : ()=>{
		 var i=1;
		 var j=1;
		 var k=1;
		 do{
			 i++;
			 j*=i;
			 k+=j;
		 }while(i<10);
		 return k;
	   },
	   fibonacci : ()=>{
		
		   var a=1,b=1,c=0,sum=2,count=2;
		   while(true){
			   c=a+b;
			   sum+=c;
			   count++;
			   if(count<20){
				   a=b;
				   b=c;
			   }else{
				   break;
			   }
		   }
		   return sum;
	   }
}
var sort = {
		// selection
		selection : (x)=>{
		      alert(x);
		      var size=x.length;
		      var temp,min,cup;
		      
		      for(var i=0; i<size-1; i++){ // size-1 : 마지막 요소는 자연스럽게 정렬됨
		            min = i;
		            for(var j=i+1; j<size; j++){
		                if(x[min] > x[j]){
		                    min = j;
		                }
		            }
		            temp = x[min];
		            x[min] = x[i];
		            x[i] = temp;
		        }
		      return x;
		},
		
		// burble
		 burbble : (x)=>{
		      alert(x);
		         var temp = 0; 
		             for(var i = 0; i < x.length - 1; i++){ 
		                 for(var j = 0; j < e.length - 1 - i; j++){ 
		                    
		                     if(x[j]*1 > x[j+1]*1){ 
		                         temp = x[j]; 
		                         x[j] = x[j+1]; 
		                         x[j+1] = temp;                                      
		                     } 
		                 } 
		             } 
		            return x;
		   },
		// insertion
		// ranking
}