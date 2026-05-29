VERSION 5.00
Begin VB.Form frmLast 
   BorderStyle     =   0  'None
   ClientHeight    =   3870
   ClientLeft      =   0
   ClientTop       =   0
   ClientWidth     =   7440
   LinkTopic       =   "Form1"
   Picture         =   "frmLast.frx":0000
   ScaleHeight     =   3870
   ScaleWidth      =   7440
   ShowInTaskbar   =   0   'False
   StartUpPosition =   1  'CenterOwner
   Begin VB.Label lblMissed 
      Alignment       =   2  'Center
      BackStyle       =   0  'Transparent
      Caption         =   "lblMissed"
      BeginProperty Font 
         Name            =   "Arial Narrow"
         Size            =   12
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FF0000&
      Height          =   330
      Left            =   5325
      TabIndex        =   2
      Top             =   3195
      Width           =   2010
   End
   Begin VB.Label lblHit 
      Alignment       =   2  'Center
      BackStyle       =   0  'Transparent
      Caption         =   "lblHit"
      BeginProperty Font 
         Name            =   "Arial Narrow"
         Size            =   12
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FF0000&
      Height          =   330
      Left            =   2970
      TabIndex        =   1
      Top             =   3195
      Width           =   2010
   End
   Begin VB.Label lblTotal 
      Alignment       =   2  'Center
      BackStyle       =   0  'Transparent
      Caption         =   "lblTotal"
      BeginProperty Font 
         Name            =   "Arial Narrow"
         Size            =   12
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FF0000&
      Height          =   330
      Left            =   315
      TabIndex        =   0
      Top             =   3255
      Width           =   2010
   End
End
Attribute VB_Name = "frmLast"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Form_KeyDown(KeyCode As Integer, Shift As Integer)
    If KeyCode = 13 Then
        frmSky.Reload
        Unload Me
    ElseIf KeyCode = 27 Then
        ShowCursor (True)
        End
    End If
End Sub
