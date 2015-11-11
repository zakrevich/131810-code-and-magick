getMessage(a:*, b:*=):string

if a=boolean 
 {
  return "Я попал в [b]"
}

else if a=number
{
  return "Я прыгнул на [a] * 100 сантиметров"
}
else if a=array {
 return "Я прошел [sum] шагов"
}
else if a=array || b=array {
  return "Я прошел [length] метров"
}
else {
  return "Я никуда не попал"
}
