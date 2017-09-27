<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<header>

</header>
            <div class="container">    
                <div class="jumbotron">
            
                  <div class="row">
                      <div class="col-md-3 col-xs-12 col-sm-6 col-lg-3">
                        <div class="thumbnail text-center photo_view_postion_b" >
                          <img src="${path.img}/det.png" alt="stack photo" class="img">
                        </div>
                      </div>
                      <div class="col-md-9 col-xs-12 col-sm-6 col-lg-9">
                          <div class="" style="border-bottom:1px solid black">
                            <span style="font-size: 50px">${student.name}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button onclick="app.controller.moveTo('member','member_update')">정보수정!</button>
                          </div>
                            <hr>
                          <div class="col-md-8">  
                          <ul class=" details">
                            <li><p id="detail_id"><span class="glyphicon glyphicon-earphone one" style="width:50px;"></span>${student.name}</p></li>
                            <li><p id="detail_phone"><span class="glyphicon glyphicon-envelope one" style="width:50px;"></span>${student.phone}</p></li>
                            <li><p id="detail_email"><span class="glyphicon glyphicon-map-marker one" style="width:50px;"></span>${student.email}</p></li>
                            <li><p id="detail_title"><span class="glyphicon glyphicon-credit-card one" style="width:50px;"></span>${student.subjects}</p></li>
                          </ul>
                          </div>
                          <div class="col-md-4">  
                            <div class="col-sm-5 col-xs-6 tital " >Birthday:</div><div class="col-sm-7 col-xs-6 ">2018/2/15</div>
                            <div class="clearfix"></div><div class="bot-border"></div>
                            <div class="col-sm-5 col-xs-6 tital " >Gender:</div><div class="col-sm-7 col-xs-6 ">Prasad</div>
                            <div class="clearfix"></div><div class="bot-border"></div>
                            <div class="col-sm-5 col-xs-6 tital " >Ethnicity:</div><div class="col-sm-7 col-xs-6 ">sdfsdfsdfsdfsdf</div>
                            <div class="clearfix"></div><div class="bot-border"></div>
                          </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group row">
                        <div class="col-md-12">
                        <div class="form-group" style="border-bottom:1px solid black">
                            <h2>CONTACT INFO</h2>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div class="row"> 
                     <div class="col-md-4">
                        <div class="col-sm-6 col-xs-6 tital " >Height(feet):</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Weight(lbs):</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Hair Color:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Hair Length:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Suit/Dress:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                     </div>
                     <div class="col-md-4">
                        <div class="col-sm-6 col-xs-6 tital " >Shirt Size:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Shoe Size:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Bust:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Waist:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Inseam:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                     </div>
                     <div class="col-md-4">
                        <div class="col-sm-6 col-xs-6 tital " >Hips:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Glove:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                        <div class="col-sm-6 col-xs-6 tital " >Hat:</div><div class="col-sm-6 col-xs-6 contant_i">Prasad</div>
                        <div class="clearfix"></div><div class="bot-border"></div>
                     </div>
                    </div>
                    
                </div>
            </div>
            
            <script>
            app.member.init();
            </script>
          