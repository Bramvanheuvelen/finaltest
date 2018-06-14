const redStudents = this.props.batch.students.filter(student => student.score === "Red")
    const yellowStudents = this.props.batch.students.filter(student => student.score === "Yellow")
    const greenStudents = this.props.batch.students.filter(student => student.score === "Green")


const semiRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 100)
  let chosenColor
  if (randomColor <= 45) chosenColor = "red"
  if (randomColor > 45 && randomColor <= 80) chosenColor = "yellow"
  if (randomColor > 80) chosenColor = "green"

  semiRandomStudent(chosenColor)  
}


const semiRandomStudent = (color) => {
  let luckyStudent
  if(color === "red" ) luckyStudent = redStudents[Math.floor(Math.random() * redStudents.length)]
  if(color === "yellow" ) luckyStudent = yellowStudents[Math.floor(Math.random() * yellowStudents.length)]
  if(color === "green" ) luckyStudent = greenStudents[Math.floor(Math.random() * greenStudents.length)]


  console.log('And the winner is: ',luckyStudent)

}


//Call the function!
semiRandomColor()