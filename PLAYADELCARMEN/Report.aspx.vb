Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration

Public Class Report

    Inherits System.Web.UI.Page

    Private cmd As SqlCommand
    Private reader As SqlDataReader

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            'If Not IsPostBack Then
            '    Me.TableFill()
            'End If
        Catch ex As Exception
        End Try
    End Sub

    Private Sub TableCLaveFill() Handles aspTableClaveFill.Click
        Try
            Using con As New SqlConnection(ConfigurationManager.ConnectionStrings("SQLConnectionString").ConnectionString)
                Using cmd As New SqlCommand()
                    cmd.CommandText = "SELECT * FROM PDC_CLAVE WHERE [CLAVE] LIKE '" & tbCLAVE_LOTE.Text & "%'"
                    cmd.Connection = con
                    con.Open()
                    gvClave.DataSource = cmd.ExecuteReader()
                    gvClave.DataBind()
                    con.Close()
                End Using
            End Using
        Catch ex As Exception
        End Try
    End Sub

    Private Sub TableCLaveEmpty() Handles aspTableClaveEmpty.Click
        Try
            gvClave.DataSource = Nothing
            gvClave.DataBind()
        Catch ex As Exception
        End Try
    End Sub

    Private Sub TableSearchFill() Handles aspTableSearchFill.Click
        Try
            gvClave.DataSource = Nothing
            gvClave.DataBind()
            Using con As New SqlConnection(ConfigurationManager.ConnectionStrings("SQLConnectionString").ConnectionString)
                Using cmd As New SqlCommand()
                    cmd.CommandText = "SELECT * FROM [PDC_CLAVE] WHERE [CLAVE] LIKE '" & tbSEARCH.Text & "%' OR [NOMBRE] LIKE '" & tbSEARCH.Text & "%'"
                    cmd.Connection = con
                    con.Open()
                    gvSearch.DataSource = cmd.ExecuteReader()
                    gvSearch.DataBind()
                    con.Close()
                End Using
            End Using
        Catch ex As Exception
        End Try
    End Sub

    Private Sub FindUID() Handles aspFindCLAVE.Click
        Try
            gvClave.DataSource = Nothing
            gvClave.DataBind()
            cmd = New SqlCommand("SELECT [GEOMETRY].STCentroid().STX X, [GEOMETRY].STCentroid().STY Y FROM [GIS].[dbo].[PDC_LOTES] WHERE [CLAVE] = @CLAVE", New SqlConnection(ConfigurationManager.ConnectionStrings("SQLConnectionString").ConnectionString))
            cmd.Parameters.AddWithValue("@CLAVE", tbCLAVEsearch.Text)
            cmd.Connection.Open()
            reader = cmd.ExecuteReader()
            If reader.HasRows Then
                Do While reader.Read()
                    Dim valX = reader.GetDouble(reader.GetOrdinal("X"))
                    Dim valY = reader.GetDouble(reader.GetOrdinal("Y"))
                    cmd.Connection.Close()
                    cmd.Connection.Dispose()
                    System.Web.UI.ScriptManager.RegisterClientScriptBlock(Page, Me.GetType(), "Script", "zoomCLAVE(" & valX & "," & valY & ");", True)
                Loop
            End If
            cmd.Connection.Close()
            cmd.Connection.Dispose()
        Catch ex As Exception
            cmd.Connection.Close()
            cmd.Connection.Dispose()
        End Try
    End Sub

End Class